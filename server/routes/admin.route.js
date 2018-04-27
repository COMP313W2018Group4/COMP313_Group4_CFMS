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


module.exports=router;

