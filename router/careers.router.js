const express = require('express');
const uploadDocs = require("../utils/middlewares/docsMulter");
const { createCareerMessage, createCareerTopic, getCareerTopics, getCareerMessages, markApplicationAsRead, deleteCareerMessage, deleteCareerTopic } = require('../controller/careers/careers.controller');
const careersRouter = express.Router();

careersRouter.get('/',  getCareerMessages);
careersRouter.post('/', uploadDocs, createCareerMessage);
careersRouter.post('/topics', createCareerTopic);
careersRouter.get('/topics', getCareerTopics);

careersRouter.post("/read/:id", markApplicationAsRead)

careersRouter.delete('/:id', deleteCareerMessage);

careersRouter.delete('/topics/:id' ,deleteCareerTopic)

module.exports = careersRouter;