const express = require('express');

const { UserController } = require('../../controllers');
const { AuthRequestMiddleware } = require('../../middlewares');
const router = express.Router();

// api/v1/user/signup POST
router.post('/signup',
    AuthRequestMiddleware.validateAuthRequest,
    UserController.createUser);

// api/v1/user/signin POST
router.post('/signin',
    AuthRequestMiddleware.validateAuthRequest,
    UserController.signIn);

// api/v1/user/role POST
router.post('/role',
    AuthRequestMiddleware.checkAuth,
    AuthRequestMiddleware.isAdmin,
    UserController.addRoleToUser);

module.exports = router;