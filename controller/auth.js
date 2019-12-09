'use strict'
let User = require('../models/users');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../config/index');
let Admin = require('../models/admin');

const userSignup = async (req, res) => {
    let body = req.body;
    await User.findOne({
        where: {
            email: body.email
        }
    }).then(current_user => {
        if (current_user) {
            return res.json("email has been used");
        } else {
            User.create({
                username: body.username,
                email: body.email,
                phone: body.phone,
                password: bcrypt.hashSync(body.password, 10),
                role: 'member'
            })
                .then(data => (res.json(data)))
        }
    })
        .catch(err => res.status(400).json(err));
}

const userSignin = async (req, res) => {
    await User.findOne({
      where: {
        email: req.body.email
      }
    }).then((user) => {
      const checkLogin = bcrypt.compareSync(req.body.password, user.password);
      if (checkLogin) {
        let token = jwt.sign({ id: user.id, role: user.role }, config.secret ,{expiresIn: '1h'});
        if (token) {
          res.status(200).json({
            message: "Success Sign In",
            token: token
          });
        }
      } else {
        res.status(200).json({
          message: "Failed Sign In",
        });
      }
    }).catch((err) => {
      res.status(200).json({
        message: err.message,
      });
    });
}


const AdminSignup = async (req, res) => {
    let body = req.body;
    await Admin.findOne({
        where: {
            email: body.email
        }
    }).then(current_user => {
        if (current_user) {
            return res.json("email has been used");
        } else {
            const admin = Admin.create({
                username: body.username,
                email: body.email,
                phone: body.phone,
                password: bcrypt.hashSync(body.password, 10),
                role: 'admin'
            })
                .then(data => (res.json(data)))
        }
    })
        .catch(err => res.status(400).json(err));
}

const AdminSignin = async (req, res) => {
    await Admin.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        const checkLogin = bcrypt.compareSync(req.body.password, user.password);
        if (checkLogin) {
            let token = jwt.sign({ id: user.id, role: user.role }, config.secret, { expiresIn: 36000 });
            if (token) {
                res.status(200).json({
                    message: "Success Sign In",
                    token: token
                });
            }
        } else {
            res.status(200).json({
                message: "Failed Sign In",
            });
        }
    }).catch((err) => {
        res.status(200).json({
            message: err.message,
        });
    });
}


module.exports = { userSignin, userSignup, AdminSignin, AdminSignup };
