const express = require("express");
const router = express.Router();

const securityRouter = express.Router();
const securityController = require("../controller/security/security.controller");   
const useAuth = require("../utils/middlewares/useAuth");
// Define routes for security-related operations

securityRouter.post("/", useAuth, securityController.createSecurityEntry);
securityRouter.get("/", useAuth, securityController.getAllSecurityEntries);

module.exports = securityRouter;