const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended:false});
const adminController = require('../controller/admin.controller');


//Login
router.post('/getAllCompanies', adminController.getAllCompanies);

module.exports=router;