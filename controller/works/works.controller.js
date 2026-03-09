const { desc, eq } = require("drizzle-orm");
const { db, worksTable } = require("../dbDetails");

const safeWork = (work) => {
  return {
    id: work.id,
    title: work.title,
    description: work.description,
    date: work.year
  };
}


class worksController {
  static async getWorks(req, res) {
    try {
      const works = await db
        .select()
        .from(worksTable)
        .orderBy(desc(worksTable.created_at));

        const resWork = works.map(safeWork);
      res.json(resWork);
    } catch (error) {
      console.error("Error fetching works:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async addWork(req, res) {
    try {
      const { title, description, date } = req.body;
      if (!title || !description || !date) {
        return res
          .status(400)
          .json({ error: "Title, description, and date are required" });
      }
      await db.insert(worksTable).values({ title, description, year: date });

      // fetch the newly added work to return in the response
        const [newWork] = await db.select().from(worksTable).orderBy(desc(worksTable.created_at)).limit(1);

      res.status(201).json({ work: safeWork(newWork) });
    } catch (error) {
      console.error("Error adding work:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteWork(req, res) {
    try {
      const { id } = req.params;
      await db.delete(worksTable).where(eq(worksTable.id, id));
      res.json({ message: "Work deleted successfully" });
    } catch (error) {
      console.error("Error deleting work:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateWork(req, res) {
    try {
      const { id } = req.params;
      const { title, description, date } = req.body;
      if (!title || !description || !date) {
        return res
          .status(400)
          .json({ error: "Title, description, and date are required" });
      }
      await db
        .update(worksTable)
        .set({ title, description, year: date })
        .where(eq(worksTable.id, id));
      //fetch the updated work to return in the response
      const [updatedWork] = await db
        .select()
        .from(worksTable)
        .where(eq(worksTable.id, id));
    return   res.json({ work: safeWork(updatedWork) });
    } catch (error) {
      console.error("Error updating work:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = worksController;