const { eq, desc } = require("drizzle-orm");
const { db, usersTable } = require("../dbDetails");
const safeUser = require("./safeUser");

const getAllUsers = async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    const safeUsers = users.map(safeUser);
    res.status(200).json(safeUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  const { name, bio, role, title, skills } = req.body;
    const image = req.fileUrl || undefined;
  if (!name || !role || !title) {
    return res
      .status(400)
      .json({ error: "Name, role, and title are required" });
  }
  try {
    await db.insert(usersTable).values({
      name,
      bio,
      role,
      title,
      skills: JSON.stringify(skills),
      image,
    });

    //fetch the newly created user to return in the response
    const addedUser = await db.select().from(usersTable).orderBy(desc(usersTable.id)).limit(1);
    if(!addedUser || addedUser.length === 0) {
        return res.status(500).json({ error: "Failed to retrieve added user" });
    }

    res.status(201).json({
      message: "User added successfully",
        user: safeUser(addedUser[0]),
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log(req.fileUrl);
  const { name, bio, role, title, skills } = req.body;
  const image = req.fileUrl || undefined;
  if (!name || !role || !title) {
    return res
      .status(400)
      .json({ error: "Name, role, and title are required" });
  }
  try {
    await db
      .update(usersTable)
      .set({
        name,
        bio,
        role,
        title,
        skills: JSON.stringify(skills),
        image,
      })
      .where(eq(usersTable.id, Number(id)));
    return res.status(200).json({
      message: "User updated successfully",
      user: safeUser({ name, bio, role, title, skills, image }),
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(usersTable).where(eq(usersTable.id, Number(id)));
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
