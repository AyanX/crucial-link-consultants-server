const { desc } = require("drizzle-orm");
const { db, contactsTable } = require("../dbDetails");

class contactsController {
  static async getContacts(req, res) {
    try {
      const lastContact = await db
        .select()
        .from(contactsTable)
        .orderBy(desc(contactsTable.id))
        .limit(1);

      const resData = {
        email: lastContact[0]?.email || "",
        phone_number: lastContact[0]?.phone_number || "",
        location: lastContact[0]?.location || "",
        city: lastContact[0]?.city || "",
        calling_time: lastContact[0]?.calling_time || "",
        phone: lastContact[0]?.phone_number || "",
      }

      res.status(200).json(resData);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  }

  static async addContacts(req, res) {
    try {


      const { email, phone, location, city, calling_time } = req.body.data;
      await db.insert(contactsTable).values({
        email: email?.trim(),
        phone_number: phone?.trim(),
        location: location?.trim(),
        city: city?.trim(),
        calling_time: calling_time?.trim()
      });
      res.status(201).json({ message: "Contacts added successfully" });
    } catch (error) {
      console.error("Error adding contacts:", error);
      res.status(500).json({ error: "Failed to add contacts" });
    }
  }
}

module.exports = contactsController;
