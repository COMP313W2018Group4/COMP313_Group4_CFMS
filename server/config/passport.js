const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const user=require("../model/user.model");

module.exports = function(passport) {
// =========================================================================
// Passport session setup
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id); //goes on session
    });

// used to deserialize the user
    passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
            done(err, user); //becomes req.user
        });
    });

// =========================================================================
// Local Login
// =========================================================================
    passport.use('local',new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback

        },
        function(req, email, password, done)
        { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            user.findOne({ 'email' :  email }, function(err, user)
            {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, console.log("No user found")); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.comparePassword(password))
                    return done(null, false, console.log("Wrong credential")); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));
};