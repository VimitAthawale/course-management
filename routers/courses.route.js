const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller')
router.post('/addCourse', coursesController.addCourse);
router.get('/getCourses', coursesController.getCourses);

module.exports = router;