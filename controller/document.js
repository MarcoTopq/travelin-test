'use strict'
let Document = require('../models/document');

const add = async (req, res) => {
    let body = req.body;
    await Document.create({
        id_card: body.id_card,
        doc_file: body.doc_file,
        user_id: body.user_id
    })
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
}

const getAll = async (req, res) => {
    await Document.findAll()
        .then(data => (res.json(data)))
        .catch(err => res.status(400).json(err))
}

const find = async (req, res) => {
    let Id = req.params.id;
    await Document.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("Account not found");
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
    await Document.findOne({
        where: {
            id: Id
        }
    })
        .then(data => {
            if (!data) {
                return res.json("Account not found");
            }
            else {
                Document.update({
                    id_card: body.id_card,
                    doc_file: body.doc_file
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
    await Document.update({
        isDelete: true
    }, {
        where: {
            id: Id
        }
    });
    await Document.destroy({
        where: {
            id: Id
        }
    })
        .then(res.json("document was remove"))
        .catch(err => res.status(400).json(err))
}

module.exports = {
    getAll,
    find,
    add,
    update,
    deleted
}