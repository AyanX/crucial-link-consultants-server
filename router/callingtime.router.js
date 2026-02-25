const express= require("express")

const callingTimeRouter = express.Router()

const callingTimeController = require("../controller/callingTime/callingTime.controller")

callingTimeRouter.get("/", callingTimeController.getCallingTime)

callingTimeRouter.post("/", callingTimeController.addCallingTime)

module.exports = callingTimeRouter