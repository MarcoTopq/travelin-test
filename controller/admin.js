'use strict'
let Admin = require('../models/admin');

const getAll = async (req, res) => {
    await Admin.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
}

const getbyId = async (req, res) => {
    let Id = req.params.id;
    await Admin.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("Admin not found");
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
    await Admin.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("Admin not found");
            }
            else {
                Admin.update({
                    Adminname: body.Adminname,
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
    await Admin.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    })
    await Admin.destroy({
        where: {
            id: Id
        }
    })
        .then(res.json("Admin was remove"))
        .catch(err => res.status(400).json(err))
}

module.exports = {
    getAll,
    getbyId,
    update,
    deleted
}