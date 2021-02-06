const { validationResult } = require('express-validator');
var AdminDetails = require('../models/adminDetails.model');
var AdminAuthentication = require('../models/adminAuthentication.model');
const mongoose = require('mongoose');
var logger = require('../config/logger');
const dotenv = require('dotenv');
let result = dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
if (result.error) {
    throw result.error;
}
const { parsed: env } = result;
const environment = process.env;

exports.addAdmin = function (req, res, next) {
    let emailId = req.body.email;
    let phoneNumber = req.body.phone_number;
    let username = req.body.username;
    AdminDetails.find({ $or: [{ 'email': emailId }, { 'phone_number': phoneNumber }, { 'username': username }] }).exec(async function (err, adminDetails) {
        if (err) {
            return next(err);
        }
        if (!adminDetails || adminDetails.length === 0) {
            var hashPassword = req.body.password;
            await bcrypt.hash(hashPassword, saltRounds, async function (err, hash) {
                hashPassword = hash;
                adminDetails = new AdminDetails({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    username: req.body.username,
                    password: hashPassword,
                    created_at: Date.now(),
                    updated_at: Date.now()
                });
                await adminDetails.save(function (err, result) {
                    if (err) {
                        logger.log("Error ocurred in admin otp save", err);
                        return next(err);
                    }
                    if (!result) {
                        res.status(500).json({ "message": 'Internal Server Problem' });
                    } else {
                        res.status(200).json({ "message": 'Admin added successfully' });
                    }
                });
            });
        } else {
            res.status(409).json({ "message": 'Email, Username or Phone Number already exist' });
        }

    })
}


exports.getAdmin = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    AdminDetails.findOne({ 'username': username }).exec(async function (err, adminDetails) {
        if (err) {
            return next(err);
        }
        if (!adminDetails || adminDetails.length === 0) {
            res.status(401).json({ "message": 'Username or password is wrong' });
        } else if (adminDetails || adminDetails.length > 0) {
            bcrypt.compare(password, adminDetails.password, async function (err, result) {
                if (result == true) {
                    const id = adminDetails._id;
                    const username = adminDetails.username;
                    const password = adminDetails.password;
                    const accessToken = jwt.sign({ username: username, password: password }, environment.JWT_SECRET);
                    AdminAuthentication.findOne({ 'admin_id': id }).exec(async function (err, adminAuthentication) {
                        if (err) {
                            return next(err);
                        }
                        if (!adminAuthentication || adminAuthentication.length === 0) {
                            adminAuthentication = new AdminAuthentication({
                                admin_id: id,
                                token: accessToken
                            });
                            await adminAuthentication.save(function (err, result) {
                                if (err) {
                                    logger.log("Error ocurred in admin otp save", err);
                                    return next(err);
                                }
                                if (!result) {
                                    res.status(500).json({ "message": 'Internal Server Problem' });
                                } else {
                                    res.status(200).json({
                                        result: {
                                            "_id": adminDetails._id,
                                            "first_name": adminDetails.first_name,
                                            "last_name": adminDetails.last_name,
                                            "email": adminDetails.email,
                                            "phone_number": adminDetails.phone_number,
                                            "username": adminDetails.username,
                                            "createdAt": adminDetails.createdAt,
                                            "updatedAt": adminDetails.updatedAt
                                        },
                                        token: accessToken
                                    });
                                }
                            });
                        } else if (adminAuthentication || adminAuthentication.length > 0) {
                            AdminAuthentication.updateOne({ 'admin_id': id }, { $set: { "token": accessToken } }, function (err, result) {
                                if (err) {
                                    return next(err);
                                } else if (!result || result.length === 0) {
                                    res.status(500).json({
                                        message: 'Internal Server Problem'
                                    });
                                } else if (result || result.length > 0) {
                                    res.status(200).json({
                                        result: {
                                            "_id": adminDetails._id,
                                            "first_name": adminDetails.first_name,
                                            "last_name": adminDetails.last_name,
                                            "email": adminDetails.email,
                                            "phone_number": adminDetails.phone_number,
                                            "username": adminDetails.username,
                                            "createdAt": adminDetails.createdAt,
                                            "updatedAt": adminDetails.updatedAt
                                        },
                                        token: accessToken
                                    });
                                }
                            })

                        }
                    })
                } else {
                    res.status(401).json({ "message": 'Username or password is wrong' });
                }
            });
        }
    })
}
