'use strict'
let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');
let expressJoi = require('express-joi-validator');
let Joi = require('joi');
let AuthController = require('../controller/auth');
let AdminController = require('../controller/admin');

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
router.post('/signup', expressJoi(bodySchema), AuthController.AdminSignup);

router.post('/signin', AuthController.AdminSignin);

router.get('/', auth.checkToken, auth.isAuthorized, AdminController.getAll);

router.get('/:id', auth.checkToken, auth.isAuthorized, AdminController.getbyId);

router.put('/:id', auth.checkToken, auth.isAuthorized, expressJoi(updateSchema), AdminController.update);

router.delete('/:id', auth.checkToken, auth.isAuthorized, AdminController.deleted);

module.exports = router;




