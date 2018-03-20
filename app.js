/*jshint esversion: 6 */
//Description: This file is the heart of the application, interconnects different files within the project

//Module for project
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/userRoute');
//Modules for authentication
const session = require('express-session');
const passport = require('passport');

//Setting environment variable
const env = process.env.DEPLOY || "dev";
const conf=require('./config/'+env+".json");

//Adding express middleware to serve the static page - e.g style.css
app.use("/public", express.static(__dirname+'/public'));

//Set view engine to be ejs engine
app.set('view engine', 'ejs');

//Authentication Packages
app.use(session({secret: "ThisProjectWillBeAwesome",saveUninitialized: true, resave: true}));

//Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Create the database connection 
mongoose.connect(conf.dburl); 

//Route
app.use('/', user);

app.listen(conf.port);
console.log("Application started on port ", conf.port);