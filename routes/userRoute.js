/*jshint esversion: 6 */
//Description: This files handles all the incoming and outgoing routes

//Required modules
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false});
const passport = require('passport');
//Defines the User model
const userModel=require("../model/userModel");


//Index GET Route
router.get('/', function(req, res, next)
{
    var feed={};
    feed.msg="home";
    res.render("index", {data:feed});
});

//Signup GET Route
router.get('/signup', function(req, res, next)
{
    var feed={};
    feed.msg= "signup";
    res.render("signup", {data:feed});
});

//Complaint GET Route
router.get('/feedback', function(req, res, next)
{
    var feed={};
    feed.msg= "signup";
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