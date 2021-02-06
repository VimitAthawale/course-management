const { validationResult } = require('express-validator');
var Courses = require('../models/course.model');
const mongoose = require('mongoose');
var logger = require('../config/logger');
const dotenv = require('dotenv');
let result = dotenv.config();
const jwt = require('jsonwebtoken');
const { parsed: env } = result;
const environment = process.env;

exports.getCourses = function (req, res, next) {
    Courses.find().exec(async function (err, course) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            result: course
        })

    })
}

exports.addCourse = async function (req, res, next) {
    if (req) {
        course = new Courses({
            name: req.body.name,
            duration: req.body.duration,
            frequency: req.body.frequency,
            tutor: req.body.tutor,
            subject: req.body.subject,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            capacity: req.body.capacity,
            course_id: req.body.course_id
        });
        await course.save(function (err, result) {
            if (err) {
                logger.log("Error ocurred in admin otp save", err);
                return next(err);
            }
            if (!result) {
                res.status(500).json({ "message": 'Internal Server Problem' });
            } else {
                res.status(200).json({ "message": 'Course added successfully' });
            }
        });
    }
}