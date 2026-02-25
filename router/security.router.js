const express = require("express");
const router = express.Router();

const securityRouter = express.Router();
const securityController = require("../controller/security/security.controller");   
// Define routes for security-related operations

securityRouter.post("/", securityController.createSecurityEntry);
securityRouter.get("/", securityController.getAllSecurityEntries);

module.exports = securityRouter;