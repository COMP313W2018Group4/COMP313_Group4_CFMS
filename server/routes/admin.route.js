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

//Get total company count
router.post('/total-company-count', adminController.getTotalCompanyCount);

//Update Company
router.post('/update-company', adminController.updateCompany);

//Add Company
router.post('/add-company', adminController.addCompany);

//Delete Company
router.post('/delete-company/:id', adminController.deleteCompany);

//Get all user
router.post('/all-user', adminController.getAllUser);

//Get all feedback
router.post('/all-feedback', adminController.getAllFeedback);

//Get user details
router.post('/user-details/:id', adminController.getUserDetails);

//Get feedback details
router.post('/feedback-details/:id', adminController.getFeedbackDetails);

module.exports=router;

