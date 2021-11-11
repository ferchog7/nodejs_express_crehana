const path = require('path');
const User = require('../models/users');
const md5 = require('md5');

exports.create = function (req, res) {
        req.body.password = md5(req.body.password); // Encrypt MD5 Password
        var newUser = new User(req.body);
        console.log(req.body);
        newUser.save(function (err, user) {
                if(err) {
                    res.status(400).send({message: err});
                }
                return res.status(201).send({user}); 
        });
};

exports.update = function (req, res) {
        var userId = req.params.id || null;
        if(userId == null) return res.status(404).send({message: 'User ID no Valid.'});
        console.log(req.body);
        User.findByIdAndUpdate(userId, req.body, {new:true}, function (err, user) {
                if(err) {
                    res.status(400).send({message: err});
                }
                return res.status(201).send({user}); 
        });
};

exports.list = function (req, res) {
        User.find({}).exec(function (err, users) {
                if (err) {
                        return res.status(500).send({message: err});
                }
                return res.status(200).send({users});
        });
};

exports.byId = function (req, res) {
        var userId = req.params.id || null;
        if(userId == null) return res.status(404).send({message: 'User ID no Valid.'});
        User.findById(userId).exec(function (err, user) {
                if (err) {
                        return res.status(400).send({message: err});
                }
                return res.status(200).send({user});
        });
};
