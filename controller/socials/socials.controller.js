const { desc } = require("drizzle-orm");
const {db, socialsTable} = require("../dbDetails");

class socialsController {
    static async getSocials(req, res) {
        try {
            const socials = await db.select().from(socialsTable).orderBy(desc(socialsTable.created_at)).limit(1)
            if (socials.length === 0) {
                return res.status(200).json({
                    facebook: "",
                    twitter: "",
                    linkedin: "",
                    supportEmail: ""
                });
            }
            const response = {
                facebook: socials[0].facebook,
                twitter: socials[0].twitter,
                linkedin: socials[0].linkedin,
                supportEmail: socials[0].email,
                
            }
            res.status(200).json(response);
        } catch (error) {
            console.error("Error fetching social media links:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async addSocials(req,res){
        try {
            const {facebook,twitter,linkedin,supportEmail} = req.body.data
            if(!facebook || !twitter || !linkedin){
                return res.status(400).json({ error: "All social media links are required" });
            }
            await db.insert(socialsTable).values({
                facebook,
                twitter,
                linkedin,
                email: supportEmail?.trim().toLowerCase() || null
            })
            res.status(201).json({ message: "Social media links added successfully" });
        } catch (error) {
            console.error("Error adding social media links:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
} 

module.exports = socialsController