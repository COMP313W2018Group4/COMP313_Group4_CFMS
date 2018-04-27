const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended:false});
const adminController = require('../controller/admin.controller');


//Return on companies
router.post('/getAllCompanies', adminController.getAllCompanies);

//Get total feedback count
router.post('/total-feedback-count', adminController.getTotalFeedbackCount);

//Get total user count
router.post('/total-user-count', adminController.getTotalUserCount);

//Get total user count
router.post('/all-user', adminController.getAllUser);

//Get user details
router.post('/user-details/:id', adminController.getUserDetails);

module.exports=router;

