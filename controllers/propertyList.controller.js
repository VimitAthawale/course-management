// const { validationResult } = require('express-validator');
// var PropertyList = require('../models/propertyList.model');
// const mongoose = require('mongoose');
// var logger = require('../config/logger');
// const multer = require('multer')
// const dotenv = require('dotenv');
// let result = dotenv.config();
// const jwt = require('jsonwebtoken');
// const { parsed: env } = result;
// const environment = process.env;
// // const AWS = require('aws-sdk');
// const uuid = require('uuid');
// if (result.error) {
//     throw result.error;
// }

// // const s3 = new AWS.S3({
// //     accessKeyId: process.env.AWS_ID,
// //     secretAccessKey: process.env.AWS_SECRET
// // })

// const storage = multer.memoryStorage({
//     destination: function (req, file, callback) {
//         callback(null, '')
//     }
// })

// exports.upload = multer({ storage }).single('image');

// exports.addProperty = async function (req, res, next) {
//     if (req) {
//         propertyList = new PropertyList({
//             host_id: req.body.host_id,
//             admin_id: req.body.admin_id,
//             property_name: req.body.property_name,
//             property_type_id: req.body.property_type_id,
//             property_address: req.body.property_address,
//             property_destination: req.body.property_destination,
//             entire_home_details: req.body.entire_home_details,
//             private_room_details: req.body.private_room_details,
//             guest_capacity: req.body.guest_capacity,
//             guest_extra_capacity: req.body.guest_extra_capacity,
//             with_or_without_food: req.body.with_or_without_food,
//             weekdays_price: req.body.weekdays_price,
//             weekends_price: req.body.weekends_price,
//             weekdays_price_extra_guest: req.body.weekdays_price_extra_guest,
//             weekends_price_extra_guest: req.body.weekends_price_extra_guest,
//             photo_list: [],
//             category1_ammenities: req.body.category1_ammenities,
//             category2_ammenities: req.body.category2_ammenities,
//             youtube_link: req.body.youtube_link,
//             property_description: req.body.property_description,
//             check_in_time: req.body.check_in_time,
//             check_out_time: req.body.check_out_time,
//             near_by_places: req.body.near_by_places,
//             house_rules: req.body.house_rules,
//             important_notes: req.body.important_notes,
//             host_name: req.body.host_name,
//             host_language: req.body.host_language,
//             status: 0
//         });
//         await propertyList.save(function (err, result) {
//             if (err) {
//                 logger.log("Error ocurred in admin otp save", err);
//                 return next(err);
//             }
//             if (!result) {
//                 res.status(500).json({ "message": 'Internal Server Problem' });
//             } else {
//                 res.status(200).json({ "hostId": result._id, "message": 'Property added successfully' });
//             }
//         });
//     }
// }

// exports.getAllProperty = function (req, res, next) {
//     PropertyList.find().exec(async function (err, propertyList) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).json({
//             result: propertyList
//         })

//     })
// }


// exports.getProperty = function (req, res, next) {
//     PropertyList.findOne({ _id: req.params.id }).exec(async function (err, propertyList) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).json({
//             result: propertyList
//         })

//     })
// }


// exports.updateProperty = async function (req, res, next) {
//     await PropertyList.findOneAndUpdate({ _id: req.params.id }, {
//         $set: {
//             'host_id': req.body.host_id,
//             'admin_id': req.body.admin_id,
//             'property_name': req.body.property_name,
//             'property_type_id': req.body.property_type_id,
//             'property_address': req.body.property_address,
//             'property_destination': req.body.property_destination,
//             'entire_home_details': req.body.entire_home_details,
//             'private_room_details': req.body.private_room_details,
//             'guest_capacity': req.body.guest_capacity,
//             'guest_extra_capacity': req.body.guest_extra_capacity,
//             'with_or_without_food': req.body.with_or_without_food,
//             'weekdays_price': req.body.weekdays_price,
//             'weekends_price': req.body.weekends_price,
//             'weekdays_price_extra_guest': req.body.weekdays_price_extra_guest,
//             'weekends_price_extra_guest': req.body.weekends_price_extra_guest,
//             'category1_ammenities': req.body.category1_ammenities,
//             'category2_ammenities': req.body.category2_ammenities,
//             'youtube_link': req.body.youtube_link,
//             'property_description': req.body.property_description,
//             'check_in_time': req.body.check_in_time,
//             'check_out_time': req.body.check_out_time,
//             'near_by_places': req.body.near_by_places,
//             'house_rules': req.body.house_rules,
//             'important_notes': req.body.important_notes,
//             'host_name': req.body.host_name,
//             'host_language': req.body.host_language,
//         }
//     }, function (err, result) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).send({ id: req.params.id, message: 'Property Updated Successfully' })

//     })
// }


// exports.approveProperty = async function (req, res, next) {
//     await PropertyList.findOneAndUpdate({ _id: req.body.propertyId }, {
//         $set: {
//             'status': req.body.status
//         }
//     }, function (err, result) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).send({ id: req.body.propertyId, message: 'Property Status Updated Successfully' })

//     })
// }