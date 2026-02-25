const express=require("express")
const messagesController = require("../controller/messages/messages.controller")

const messagesRouter = express.Router()


messagesRouter.get("/", messagesController.getMessages)
messagesRouter.post("/", messagesController.addMessage)

messagesRouter.delete("/:id",messagesController.deleteMessage)

messagesRouter.post("/read/:id",messagesController.readMessage)

module.exports= messagesRouter