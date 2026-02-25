const { eq, desc } = require("drizzle-orm");
const { db, whyPickUsTable } = require("../dbDetails");

// get why pick us content
const getWhyPickUs = async (req, res) => {
  try {
    const whyPickUsContent = await db
      .select()
      .from(whyPickUsTable)
      .orderBy(desc(whyPickUsTable.id));
    res.status(200).json(whyPickUsContent || {});
  } catch (error) {
    console.error("Error fetching why pick us content:", error);
    res.status(500).json({ error: "Failed to fetch why pick us content" });
  }
};

//add why pick us content
const addWhyPickUs = async (req, res) => {
  try {
    const { content } = req.body;
    await db.insert(whyPickUsTable).values({ content });

    // Return the newly created content with its ID
    const newContent = await db
      .select()
      .from(whyPickUsTable)
      .orderBy(desc(whyPickUsTable.id))
      .limit(1);

    return res.status(201).json(newContent[0] || {});
  } catch (error) {
    console.error("Error adding why pick us content:", error);
    return res.status(500).json({ error: "Failed to add why pick us content" });
  }
};

const updateWhyPickUs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }
    const { content } = req.body;
    await db
      .update(whyPickUsTable)
      .set({ content })
      .where(eq(whyPickUsTable.id, id));
    return res
      .status(200)
      .json({ message: "Why pick us content updated successfully" });
  } catch (error) {
    console.error("Error updating why pick us content:", error);
    return res
      .status(500)
      .json({ error: "Failed to update why pick us content" });
  }
};

const deleteWhyPickUs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }
    await db.delete(whyPickUsTable).where(eq(whyPickUsTable.id, id));
    return res
      .status(200)
      .json({ message: "Why pick us content deleted successfully" });
  } catch (error) {
    console.error("Error deleting why pick us content:", error);
    return res
      .status(500)
      .json({ error: "Failed to delete why pick us content" });
  }
};

module.exports = {
  getWhyPickUs,
  addWhyPickUs,
  deleteWhyPickUs,
  updateWhyPickUs,
};
