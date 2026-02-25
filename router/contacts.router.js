const express = require("express");

const contactsRouter = express.Router();

const contactsController = require("../controller/contacts/contacts.controller");

// get contacts
contactsRouter.get("/", contactsController.getContacts);

// add contacts
contactsRouter.post("/", contactsController.addContacts)

module.exports = contactsRouter;