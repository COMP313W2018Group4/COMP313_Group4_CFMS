/*jshint esversion: 6 */
//Description: This files handles all the incoming and outgoing routes

//Required modules
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false});
const passport = require('passport');
const controller = require('../controller/controller')
const userModel=require("../model/userModel");


//---------------------HOME-----------------------
router.get('/', function(req, res, next)
{
    const feed = {};
    feed.msg="home";
    res.render("index", {data:feed});
});

//--------------------LOGIN-----------------------
//Login POST Route
router.post('/', urlencodedparser, controller.auth);
router.post('/login', urlencodedparser, controller.auth);

//--------------------SIGNUP----------------------
//Signup GET Route
router.get('/signup', function(req, res, next)
{
    const feed = {};
    res.render("signup", {data:feed});
});
//Signup POST Route
router.post('/signup', urlencodedparser, controller.insert);


//------------------FEEDBACK-----------------------
//Feedback GET Route
router.get('/feedback', controller.reqAuth, function(req, res, next)
{
    const feed = {};
    res.render("feedback", {data:feed});
});


//---------------PASSPORT CONFIG-----------------
// used to serialize the user for the session
passport.serializeUser(function(username, done) {
    done(null, username); 
});

// used to deserialize the user
passport.deserializeUser(function(username, done) {
        done(null, username);
});

module.exports = router;