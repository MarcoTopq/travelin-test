'use strict'
var User = require('../models/users');

const getAll = async (req, res) => {
    await User.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
}

const getbyId = async (req, res) => {
    let Id = req.params.id;
    await User.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("User not found");
            }
            else {
                return res.json(data);
            }
        })
        .catch(err => res.status(400).json(err))
}

const update = async (req, res) => {
    let Id = req.params.id;
    let body = req.body;
    await User.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("User not found");
            }
            else {
                User.update({
                    username: body.username,
                    email: body.email,
                    phone: body.phone,
                    password: body.password
                }, {
                    where: {
                        id: Id
                    }
                })
            }
        })
        .then(res.json('data was update'))
        .catch(err => res.status(400).json(err))
}

const deleted = async (req, res) => {
    let Id = req.params.id;
    await User.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    })
    await User.destroy({
        where: {
            id: Id
        }
    })
        .then(res.json("User was remove"))
        .catch(err => res.status(400).json(err))
}

module.exports = { getAll, getbyId, update, deleted };
