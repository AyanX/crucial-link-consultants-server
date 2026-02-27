const express= require("express")

const callingTimeRouter = express.Router()

const callingTimeController = require("../controller/callingTime/callingTime.controller")
const useAuth = require("../utils/middlewares/useAuth")

callingTimeRouter.get("/", callingTimeController.getCallingTime)

callingTimeRouter.post("/", useAuth, callingTimeController.addCallingTime)

module.exports = callingTimeRouter