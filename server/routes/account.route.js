const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({extended:false});
const accountController= require('../controller/account.controller');


//Register
router.post('/register', accountController.register);

//Login
router.post('/login', accountController.login);

//Logout
router.get('/logout', accountController.logout);

//Update
router.post('/update-user/:id', accountController.updateUser);

//Delete
router.post('/delete-user/:id', accountController.deleteUser);

module.exports=router;