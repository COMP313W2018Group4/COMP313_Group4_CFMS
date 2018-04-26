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

module.exports=router;