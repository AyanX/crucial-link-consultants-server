const express = require("express");
const userRouter = express.Router();

const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/users/users.controller");
const upload  = require("../utils/middlewares/multer");

userRouter.get("/", getAllUsers);

userRouter.post("/", upload, addUser);

userRouter.patch("/:id", upload,updateUser);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
