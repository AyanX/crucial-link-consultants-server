const express = require("express");
const userRouter = express.Router();

const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/users/users.controller");
const upload  = require("../utils/middlewares/multer");
const useAuth = require("../utils/middlewares/useAuth");

userRouter.get("/", getAllUsers);

userRouter.post("/", useAuth, upload, addUser);

userRouter.patch("/:id", useAuth, upload, updateUser);

userRouter.delete("/:id", useAuth, deleteUser);

module.exports = userRouter;
