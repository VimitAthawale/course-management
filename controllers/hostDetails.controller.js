// const { validationResult } = require('express-validator');
// var HostDetails = require('../models/hostDetails.model');
// var HostAuthentication = require('../models/hostAuthentication.model');
// const mongoose = require('mongoose');
// var logger = require('../config/logger');
// const dotenv = require('dotenv');
// let result = dotenv.config();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// if (result.error) {
//     throw result.error;
// }
// const { parsed: env } = result;
// const environment = process.env;

// exports.addHost = function (req, res, next) {
//     let emailId = req.body.email;
//     let phoneNumber = req.body.phone_number;
//     let username = req.body.username;
//     HostDetails.find({ $or: [{ 'email': emailId }, { 'private_phone_number': phoneNumber }, { 'username': username }] }).exec(async function (err, hostDetails) {
//         if (err) {
//             return next(err);
//         }
//         if (!hostDetails || hostDetails.length === 0) {
//             var hashPassword = req.body.password;
//             await bcrypt.hash(hashPassword, saltRounds, async function (err, hash) {
//                 hashPassword = hash;
//                 hostDetails = new HostDetails({
//                     first_name: req.body.first_name,
//                     last_name: req.body.last_name,
//                     business_name: req.body.business_name,
//                     business_pan_number: req.body.business_pan_number,
//                     business_tan_number: req.body.business_tan_number,
//                     business_gst_number: req.body.business_gst_number,
//                     email: req.body.email,
//                     address: req.body.address,
//                     private_phone_number: req.body.private_phone_number,
//                     business_phone_number: req.body.business_phone_number,
//                     aadhaar_card_number: req.body.aadhaar_card_number,
//                     username: req.body.username,
//                     password: hashPassword,
//                     status: 0,
//                     created_at: Date.now(),
//                     updated_at: Date.now()
//                 });
//                 await hostDetails.save(function (err, result) {
//                     if (err) {
//                         logger.log("Error ocurred in admin otp save", err);
//                         return next(err);
//                     }
//                     if (!result) {
//                         res.status(500).json({ "message": 'Internal Server Problem' });
//                     } else {
//                         res.status(200).json({ "message": 'Host added successfully' });
//                     }
//                 });
//             });
//         } else {
//             res.status(409).json({ "message": 'Email, Username or Phone Number already exist' });
//         }

//     })
// }


// exports.getHost = function (req, res, next) {
//     let username = req.body.username;
//     let password = req.body.password;
//     HostDetails.findOne({ 'username': username }).exec(async function (err, hostDetails) {
//         if (err) {
//             return next(err);
//         }
//         if (!hostDetails || hostDetails.length === 0) {
//             res.status(401).json({ "message": 'Username or password is wrong' });
//         } else if (hostDetails || hostDetails.length > 0) {
//             bcrypt.compare(password, hostDetails.password, async function (err, result) {
//                 if (result == true) {
//                     const id = hostDetails._id;
//                     const username = hostDetails.username;
//                     const password = hostDetails.password;
//                     const accessToken = jwt.sign({ username: username, password: password }, environment.JWT_SECRET);
//                     HostAuthentication.findOne({ 'host_id': id }).exec(async function (err, hostAuthentication) {
//                         if (err) {
//                             return next(err);
//                         }
//                         if (!hostAuthentication || hostAuthentication.length === 0) {
//                             hostAuthentication = new HostAuthentication({
//                                 host_id: id,
//                                 token: accessToken
//                             });
//                             await hostAuthentication.save(function (err, result) {
//                                 if (err) {
//                                     logger.log("Error ocurred in admin otp save", err);
//                                     return next(err);
//                                 }
//                                 if (!result) {
//                                     res.status(500).json({ "message": 'Internal Server Problem' });
//                                 } else {
//                                     res.status(200).json({
//                                         result: {
//                                             "_id": hostDetails._id,
//                                             "first_name": hostDetails.first_name,
//                                             "last_name": hostDetails.last_name,
//                                             "business_name": hostDetails.business_name,
//                                             "business_pan_number": hostDetails.business_pan_number,
//                                             "business_tan_number": hostDetails.business_tan_number,
//                                             "business_gst_number": hostDetails.business_gst_number,
//                                             "email": hostDetails.email,
//                                             "address": hostDetails.address,
//                                             "private_phone_number": hostDetails.private_phone_number,
//                                             "business_phone_number": hostDetails.business_phone_number,
//                                             "aadhaar_card_number": hostDetails.aadhaar_card_number,
//                                             "username": hostDetails.username,
//                                             "status": hostDetails.status,
//                                             "createdAt": hostDetails.createdAt,
//                                             "updatedAt": hostDetails.updatedAt
//                                         },
//                                         token: accessToken
//                                     });
//                                 }
//                             });
//                         } else if (hostAuthentication || hostAuthentication.length > 0) {
//                             HostAuthentication.updateOne({ 'host_id': id }, { $set: { "token": accessToken } }, function (err, result) {
//                                 if (err) {
//                                     return next(err);
//                                 } else if (!result || result.length === 0) {
//                                     res.status(500).json({
//                                         message: 'Internal Server Problem'
//                                     });
//                                 } else if (result || result.length > 0) {
//                                     res.status(200).json({
//                                         result: {
//                                             "_id": hostDetails._id,
//                                             "first_name": hostDetails.first_name,
//                                             "last_name": hostDetails.last_name,
//                                             "business_name": hostDetails.business_name,
//                                             "business_pan_number": hostDetails.business_pan_number,
//                                             "business_tan_number": hostDetails.business_tan_number,
//                                             "business_gst_number": hostDetails.business_gst_number,
//                                             "email": hostDetails.email,
//                                             "address": hostDetails.address,
//                                             "private_phone_number": hostDetails.private_phone_number,
//                                             "business_phone_number": hostDetails.business_phone_number,
//                                             "aadhaar_card_number": hostDetails.aadhaar_card_number,
//                                             "username": hostDetails.username,
//                                             "status": hostDetails.status,
//                                             "createdAt": hostDetails.createdAt,
//                                             "updatedAt": hostDetails.updatedAt
//                                         },
//                                         token: accessToken
//                                     });
//                                 }
//                             })

//                         }
//                     })
//                 } else {
//                     res.status(401).json({ "message": 'Username or password is wrong' });
//                 }
//             });
//         }
//     })
// }

// exports.getAllHost = function (req, res, next) {
//     HostDetails.find({}).select("-password").exec(async function (err, hostDetails) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).json({
//             result: hostDetails
//         })

//     })
// }

// exports.getHostById = function (req, res, next) {
//     HostDetails.find({ _id: req.params.id }).select("-password").exec(async function (err, hostDetails) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).json({
//             result: hostDetails
//         })

//     })
// }


// exports.updateHost = async function (req, res, next) {
//     await HostDetails.findOneAndUpdate({ _id: req.params.id }, {
//         $set: {
//             'first_name': req.body.first_name,
//             'last_name': req.body.last_name,
//             'business_name': req.body.business_name,
//             'business_pan_number': req.body.business_pan_number,
//             'business_tan_number': req.body.business_tan_number,
//             'business_gst_number': req.body.business_gst_number,
//             'address': req.body.address,
//             'private_phone_number': req.body.private_phone_number,
//             'business_phone_number': req.body.business_phone_number,
//             'aadhaar_card_number': req.body.aadhaar_card_number
//         }
//     }, function (err, result) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).send({ id: req.params.id, message: 'Host Updated Successfully' })

//     })
// }

// exports.approveHost = async function (req, res, next) {
//     await HostDetails.findOneAndUpdate({ _id: req.body.hostId }, {
//         $set: {
//             'status': req.body.status
//         }
//     }, function (err, result) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).send({ id: req.body.hostId, message: 'Host Status Updated Successfully' })

//     })
// }