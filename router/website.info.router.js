const express = require("express");
const websiteInfoRouter = express.Router();

const webInfoController = require("../controller/websiteInfo/website.info.controller");

websiteInfoRouter.get("/", webInfoController.getWebInfo);
websiteInfoRouter.post("/", webInfoController.addWebInfo);

module.exports = websiteInfoRouter;