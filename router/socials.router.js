const express = require('express')
const socialsController = require('../controller/socials/socials.controller')
const useAuth = require('../utils/middlewares/useAuth')

const socialsRouter = express.Router()

socialsRouter.get('/', socialsController.getSocials)
socialsRouter.post('/', useAuth, socialsController.addSocials)

module.exports = socialsRouter