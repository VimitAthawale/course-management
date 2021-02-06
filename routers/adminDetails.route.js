const express = require('express');
const router = express.Router();
const adminDetailsController = require('../controllers/adminDetails.controller')
router.post('/addAdmin', adminDetailsController.addAdmin);
router.post('/getAdmin', adminDetailsController.getAdmin);

module.exports = router;