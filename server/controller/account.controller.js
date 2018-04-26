const userModel=require("../model/user.model");
const jwt= require('jsonwebtoken');
const passport = require('passport');
const tokenSecret= 'secret2018';

/* ===============================================
    Register route, insert user into database
  ================================================*/
const register= function (req, res)
{
    const ret = {};
    const user= new userModel(req.body);
    console.log("First Name: "+req.body.firstName, "Last Name: "+req.body.lastName);
    user.save(function (err, retObj)
    {
        if (err)
        {
            ret.msg= err.message;
            console.log(err)
            return res.json({'error': err});
        }
        if (!retObj)
        {
            console.log("No user added");
            return res.json({'error': null});
        }
        else
        {
            res.json({'userId': retObj._id});
            console.log("User added");
        }
    });
};

/* ===============================================
    Login route, authenticate user
  ================================================*/
const login= function(req, res, next)
{
    console.log("email: "+ req.body.email);
    console.log("password: "+req.body.password);
    passport.authenticate('local', function(err, user, info)
    {
        res.set('Access-Control-Allow-Origin', '*');
        if (err) // If error
        {
            console.log(err);
            return next(err);
        }
        if (!user) // No user found
        {
            console.log("No user");
            return res.json({'user': null});
        }
        req.login(user, function (err)
        {
            if (err)
            {
                res.send(err);
            }
            res.json({'userId': user.id, 'firstName': user.firstName});
            console.log(user.email+" has logged in");
        });

    })(req, res, next);
};

/* ===============================================
    Get current user
  ================================================*/
const currentUser=function(req, res)
{
    console.log(req.params.id);
    const ret= {};
    userModel.findById(req.params.id, function (err, retUserObj)
    {
        if (err)
        {
            ret.msg= err.message;
            res.json({ret});
            console.log(ret);
        }
        if (!retUserObj)
        {
            res.json({'user': null});
            console.log("No user found with id: "+ req.params.id);
        }
        else
        {
            res.json({'firstName': retUserObj.firstName, 'lastName': retUserObj.lastName, 'email': retUserObj.email});
            console.log("Returned current user to client");
        }

    })
};


/* ===============================================
    Logout
  ================================================*/
const logout=function(req, res, next)
{
    req.logOut();
    res.json("You have been logged out");
};


module.exports= {"register": register, "login": login, "logout": logout, "currentUser": currentUser};