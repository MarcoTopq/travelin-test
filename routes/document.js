'use strict'
let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');
let expressJoi = require('express-joi-validator');
let Joi = require('joi');
let DocController = require('../controller/document');

let bodySchema = {
  body: {
    id_card: Joi.string().required(),
    doc_file: Joi.string().required(),
    user_id: Joi.number().required()
  }
};

let updateSchema = {
  body: {
    id_card: Joi.string().allow(""),
    doc_file: Joi.string().allow(""),
  }
};

router.post('/', auth.checkToken, expressJoi(bodySchema), DocController.add);

router.get('/', auth.checkToken, auth.isAuthorized, DocController.getAll)

router.get('/:id', auth.checkToken, DocController.find);

router.put('/:id', auth.checkToken, expressJoi(updateSchema), DocController.update);

router.delete('/:id', auth.checkToken, auth.isAuthorized, DocController.deleted);

module.exports = router;