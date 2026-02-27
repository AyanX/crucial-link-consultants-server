const express = require("express");

const contactsRouter = express.Router();

const contactsController = require("../controller/contacts/contacts.controller");
const useAuth = require("../utils/middlewares/useAuth");

// get contacts
contactsRouter.get("/", contactsController.getContacts);

// add contacts
contactsRouter.post("/", useAuth, contactsController.addContacts)

module.exports = contactsRouter;