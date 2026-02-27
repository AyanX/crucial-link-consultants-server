const express=require("express")
const messagesController = require("../controller/messages/messages.controller")
const useAuth = require("../utils/middlewares/useAuth")

const messagesRouter = express.Router()


messagesRouter.get("/",useAuth, messagesController.getMessages)
messagesRouter.post("/",  messagesController.addMessage)

messagesRouter.delete("/:id", useAuth, messagesController.deleteMessage)

messagesRouter.post("/read/:id", useAuth, messagesController.readMessage)

module.exports= messagesRouter