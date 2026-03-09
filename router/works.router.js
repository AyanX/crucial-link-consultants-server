const express = require("express");
const worksController = require("../controller/works/works.controller");
const useAuth = require("../utils/middlewares/useAuth");

const worksRouter = express.Router();


worksRouter.get("/", worksController.getWorks);

worksRouter.post("/",useAuth, worksController.addWork);

worksRouter.delete("/:id", useAuth,worksController.deleteWork);

worksRouter.put("/:id", useAuth, worksController.updateWork);

module.exports = worksRouter