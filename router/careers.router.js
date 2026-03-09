const express = require('express');
const uploadDocs = require("../utils/middlewares/docsMulter");
const { createCareerMessage, createCareerTopic, getCareerTopics, getCareerMessages, markApplicationAsRead, deleteCareerMessage, deleteCareerTopic } = require('../controller/careers/careers.controller');
const useAuth = require('../utils/middlewares/useAuth');
const careersRouter = express.Router();

careersRouter.get('/', useAuth,  getCareerMessages);
careersRouter.post('/', uploadDocs, createCareerMessage);
careersRouter.post('/topics', useAuth, createCareerTopic);
careersRouter.get('/topics', getCareerTopics);

careersRouter.post("/read/:id", useAuth, markApplicationAsRead)

careersRouter.delete('/:id',useAuth, deleteCareerMessage);

careersRouter.delete('/topics/:id' , useAuth,deleteCareerTopic)

module.exports = careersRouter;