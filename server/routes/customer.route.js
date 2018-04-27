const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended:false});
const accountController= require('../controller/account.controller');
const customerController= require('../controller/customer.controller');


//Get current user
router.post('/current-user/:id', accountController.currentUser);

//Insert feedback
router.post('/feedback', customerController.createFeedback);

//Get all feedback count
router.post('/all-feedback-count/:id', customerController.getAllFeedbackCount);

//Get current feedback count
router.post('/current-feedback-count/:id', customerController.getCurrentFeedbackCount);

//View feedback details
router.post('/view-feedback/:id', customerController.viewFeedback);

//Delete feedback
router.post('/delete-feedback/:id', customerController.deleteFeedback);

//Get all feedback by user
router.post('/all-feedback/:id', customerController.getAllFeedback);

module.exports=router;