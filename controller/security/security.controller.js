const {db, adminTable} = require("../dbDetails");
const { hashPassword, comparePasswords } = require("../../utils/bcrypt/bcrypt");
const { desc } = require("drizzle-orm");

const safeAdmin = (admin)=>{
    const adminRes = {
        adminEmail: admin?.email,
        username: admin?.username,
        password: "********",
    }
    return adminRes
}
class SecurityController {
  // Create a new security entry
 static async createSecurityEntry(req, res) {
    try {
      const { adminEmail,username, currentPassword, newPassword } = req.body.data;

      if(!adminEmail || !username || !currentPassword || !newPassword){
        return res.status(400).json({ message: "All fields are required" });
      }

      // Fetch the existing admin entry from the database
      const existingAdmin = await db.select().from(adminTable).orderBy(desc(adminTable.created_at)).limit(1);

      if (existingAdmin.length === 0) {
        return res.status(404).json({ message: "Admin entry not found" });
      }

      const admin = existingAdmin[0];

      // Check if the current password matches the stored hashed password
      const isPasswordMatch = await comparePasswords(currentPassword, admin.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

    //first try, just hash and add
        const hashedPassword = await hashPassword(newPassword);

        await db.insert(adminTable).values({
          email: adminEmail,
          username:username,
          password: hashedPassword,
        });

      res.status(201).json({ message: "Security entry created" });
    } catch (error) {
      console.error("Error creating security entry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get all security entries
  static async getAllSecurityEntries(req, res) {
    try {
      const entries = await db.select().from(adminTable).orderBy(desc(adminTable.created_at)).limit(1)

      const adminRes = safeAdmin(entries[0])
      res.status(200).json(adminRes);
    } catch (error) {
      console.error("Error fetching security entries:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports =SecurityController;