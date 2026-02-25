const { desc, eq } = require("drizzle-orm");
const { messagesTable, db } = require("../dbDetails");

class messagesController {
  static async getMessages(req, res) {
    try {
      const messages = await db
        .select()
        .from(messagesTable)
        .orderBy(desc(messagesTable.created_at));
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
  static async addMessage(req, res) {
    const { fullName, organization, workEmail, subject, message } = req.body;

    try {
      if (!(fullName || workEmail || subject || message)) {
        return res.status(401).json({ message: "missing fields" });
      }
      await db.insert(messagesTable).values({
        name: fullName,
        email: workEmail,
        subject,
        message,
        organization: organization || null,
      });
      return res.status(201).json({ message: "message created successfully" });
    } catch (e) {
      console.log("error addng message ", e);
      return res.status(401);
    }
  }
  static async deleteMessage(req, res) {
    const messageId = req.params.id;
    if (!messageId) {
      return res.status(404).json({ message: "message not found" });
    }
    try {
      await db.delete(messagesTable).where(eq(messagesTable.id, messageId));
      return res.status(200).json({ message: "message deleted successfully" });
    } catch (error) {
      console.error("Error deleting message:", error);
      return res.status(500).json({ message: "Failed to delete message" });
    }
  }
  static async readMessage(req, res) {
    // TODO
    try {
      const messageId = req.params.id;
      if (!messageId) {
        return res.status(404).json({ message: "message not found" });
      }
      //mark isRead as true
      await db
        .update(messagesTable)
        .set({ isRead: true })
        .where(eq(messagesTable.id, messageId));

      return res.status(200).json({ message: "message marked as read" });
    } catch (e) {
      console.error("message not read ", e);
      return res.status(401).json({ message: "message not read" });
    }
  }
}
module.exports = messagesController;
