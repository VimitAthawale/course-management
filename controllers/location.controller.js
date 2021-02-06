// const { validationResult } = require('express-validator');
// var Location = require('../models/location.model');
// const mongoose = require('mongoose');
// var logger = require('../config/logger');
// const dotenv = require('dotenv');
// let result = dotenv.config();
// const jwt = require('jsonwebtoken');
// const { parsed: env } = result;
// const environment = process.env;

// exports.getAllLocation = function (req, res, next) {
//     Location.find().exec(async function (err, location) {
//         if (err) {
//             return next(err);
//         }
//         res.status(200).json({
//             result: location
//         })

//     })
// }

// exports.addLocation = async function (req, res, next) {
//     if (req) {
//         location = new Location({
//             location_name: req.body.location_name,
//         });
//         await location.save(function (err, result) {
//             if (err) {
//                 logger.log("Error ocurred in admin otp save", err);
//                 return next(err);
//             }
//             if (!result) {
//                 res.status(500).json({ "message": 'Internal Server Problem' });
//             } else {
//                 res.status(200).json({ "message": 'Location added successfully' });
//             }
//         });
//     }
// }