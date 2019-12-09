'use strict'
let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');
let expressJoi = require('express-joi-validator');
let Joi = require('joi');
let AuthController = require('../controller/auth');
let UserController = require('../controller/user');

let bodySchema = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
  }
};

let updateSchema = {
  body: {
    username: Joi.string().allow(""),
    email: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    password: Joi.string().allow(""),
  }
};

router.post('/signup', expressJoi(bodySchema), AuthController.userSignup)

router.post('/signin', AuthController.userSignin);

//just admin can access
router.get('/', auth.checkToken, auth.isAuthorized, UserController.getAll)

router.get('/:id', auth.checkToken, UserController.getbyId)

router.put('/:id', auth.checkToken, expressJoi(updateSchema), UserController.update)

//just admin can access
router.delete('/:id', auth.checkToken, auth.isAuthorized, UserController.deleted)

module.exports = router;
