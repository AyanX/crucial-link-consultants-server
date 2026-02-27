const {db, adminTable} = require("../dbDetails");
const { hashPassword, comparePasswords } = require("../../utils/bcrypt/bcrypt");
const { desc, eq } = require("drizzle-orm");
const { generateToken, generateRefreshToken } = require("../../utils/jwt/jwt");

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        try {
            const existingAdmin = await db.select().from(adminTable).where(eq(adminTable.email, email)).orderBy(desc(adminTable.created_at)).limit(1);
            if (existingAdmin.length === 0) {
                return res.status(404).json({ message: "Admin entry not found" });
            }
            const admin = existingAdmin[0];
            const isPasswordMatch = await comparePasswords(password, admin.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
            const adminRes = {
                id: admin.id,
                email: admin?.email,
                name: admin?.username
            }
            const token = generateToken({ id: admin.id, email: admin.email });
            const refreshToken = generateRefreshToken({ id: admin.id, email: admin.email });
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 *60 *15 // 15 mins
            }).cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 3600000 // 7 days in milliseconds
            });
            await db.update(adminTable).set({ refreshToken }).where(eq(adminTable.id, admin.id));
            const adminName = admin?.username || "Admin";

            // split the name and take the first letters
            const nameParts = adminName.split(" ");
            const initials = nameParts.map(part => part.charAt(0)).join("").toUpperCase();

            return res.status(200).json({user:adminRes, initials});
        } catch (error) {
            console.error("Error during login:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async logout(req, res) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        }).clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
        return res.status(200).json({ message: "Logged out successfully" });
    }
}

module.exports = AuthController;