const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended:false});
const accountController= require('../controller/account.controller');


//Login
router.post('/current-user/:id', accountController.currentUser);

module.exports=router;