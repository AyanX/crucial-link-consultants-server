const express = require('express')
const socialsController = require('../controller/socials/socials.controller')

const socialsRouter = express.Router()

socialsRouter.get('/', socialsController.getSocials)
socialsRouter.post('/', socialsController.addSocials)

module.exports = socialsRouter