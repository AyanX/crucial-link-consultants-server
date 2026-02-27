const express = require("express");
const websiteInfoRouter = express.Router();

const webInfoController = require("../controller/websiteInfo/website.info.controller");
const useAuth = require("../utils/middlewares/useAuth");

websiteInfoRouter.get("/", webInfoController.getWebInfo);
websiteInfoRouter.post("/", useAuth, webInfoController.addWebInfo);

module.exports = websiteInfoRouter;