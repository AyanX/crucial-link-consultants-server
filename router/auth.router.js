const AuthController = require('../controller/auth/auth.controller');

const express = require('express');
const useAuth = require('../utils/middlewares/useAuth');
const AuthRouter = express.Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', useAuth, AuthController.logout);

module.exports = AuthRouter;