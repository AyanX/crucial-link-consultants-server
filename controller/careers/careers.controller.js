const { desc,eq } = require("drizzle-orm");
const {careersTable,db,careerTopicsTable} = require("../dbDetails");

class CareersController {
    static async createCareerMessage(req, res) {
        try {
            const { fullName, email, subject, qualification, experience, motivation ,position} = req.body;
            const document_url = req.fileUrl; // file URL is set by the middleware
            if(!fullName || !email || !qualification || !experience || !motivation || !document_url || !position) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const newMessage = await db.insert(careersTable).values({
                fullName,
                email,
                subject,
                position,
                qualification,
                experience,
                motivation,
                document_url
            });
            res.status(201).json({ message: 'Application received successfully!', data: newMessage });
        } catch (error) {
            console.error('Error creating career message:', error);
            res.status(500).json({ message: 'An error occurred while processing your application.' });
        }
    }

    static async getCareerMessages(req, res) {
        try {
            const messages = await db.select().from(careersTable).orderBy(desc(careersTable.created_at));
            res.status(200).json({ message: 'Career messages retrieved successfully!', data: messages });
        } catch (error) {
            console.error('Error retrieving career messages:', error);
            res.status(500).json({ message: 'An error occurred while retrieving career messages.' });
        }
    }

    static async createCareerTopic(req, res) {
        try {
            const { topic } = req.body;

            if(!topic) {
                return res.status(400).json({ message: 'Topic is required.' });
            }
            const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();
             await db.insert(careerTopicsTable).values({ topic: formattedTopic });
            res.status(201).json({ message: 'Career topic created successfully!' });
        } catch (error) {
            console.error('Error creating career topic:', error);
            res.status(500).json({ message: 'An error occurred while creating the career topic.' });
        }
    }

    static async getCareerTopics(req, res) {
        try {
            const topics = await db.select().from(careerTopicsTable).orderBy(desc(careerTopicsTable.created_at));
            res.status(200).json({ message: 'Career topics retrieved successfully!', data: topics });
        } catch (error) {
            console.error('Error retrieving career topics:', error);
            res.status(500).json({ message: 'An error occurred while retrieving career topics.' });
        }
    }

    static async markApplicationAsRead(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Application ID is required.' });
            }
            await db.update(careersTable).set({ isRead: true }).where(eq(careersTable.id, id));
            res.status(200).json({ message: 'Application marked as read successfully!' });
        } catch (error) {
            console.error('Error marking application as read:', error);
            res.status(500).json({ message: 'An error occurred while marking the application as read.' });
        }
    }

    static async deleteCareerMessage(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Application ID is required.' });
            }
            await db.delete(careersTable).where(eq(careersTable.id, id));
            res.status(200).json({ message: 'Career message deleted successfully!' });
        } catch (error) {
            console.error('Error deleting career message:', error);
            res.status(500).json({ message: 'An error occurred while deleting the career message.' });
        }
    }

    static async deleteCareerTopic(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: 'Topic ID is required.' });
            }
            await db.delete(careerTopicsTable).where(eq(careerTopicsTable.id, id));
            res.status(200).json({ message: 'Career topic deleted successfully!' });
        } catch (error) {
            console.error('Error deleting career topic:', error);
            res.status(500).json({ message: 'An error occurred while deleting the career topic.' });
        }   }
}
module.exports = CareersController;