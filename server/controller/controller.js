const userModel = require("../model/userModel");
const feedbackModel = require("../model/feedbackModel");
const companyModel = require("../model/companyModel");

//Function to check if the user is authenticated
const reqAuth = function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }
    else {
        next();
    }
}


//Insert user into db (Signup form)
const insertUser = function (req, res) {
    //Add user to DB
    const feed = {};

    //Retrieve data from form body
    const newUser = new userModel(req.body);
    newUser.save(function (err) {
        if (err) {
            feed.msg = err.message;
        } else {
            feed.msg = "User added successfully"
            console.log(req.body.email + " added to database");
            newUser.password = undefined;
            res.json(newUser);
        }

    });

};


//------- this function is Deprecated-----------//
//Insert feedback into db (feedback form)
const insertFeedback = function (req, res) {
    const feed = {};
    const newFeedback = new feedbackModel(req.body);
    newFeedback.save(function (err) {
        if (err) {
            feed.msg = err.message;
            console.log(err);
        } else {
            feed.msg = "Feedback submitted successfully";
            console.log("feedback added to database");
            feed.msg = "feedback";
            feed.rel = "Thank you for your feedback. Our customer service team will be in touch with you shortly."
            res.render("feedback",
                {
                    firstname: req.session.user.firstname,
                    lastname: req.session.user.lastname,
                    email: req.session.user.email,
                    data: feed
                });
        }

    })
};

//Search DB for user for authentication
const auth = function (req, res) {
    console.log("auth");
    //Autheticate user through db search
    const email = req.body.email;
    const password = req.body.password;

    userModel.findOne({ email: email, password: password }, function (err, user) {
        console.log(email);
        console.log(password)
        const feed = {};
        //If error found
        if (err) {
            console.log(err);
            feed.msg = err.message;
        }
        //If no user found
        if (!user) {
            console.log("User not found");
            feed.msg = "No user found";
        }
        else //If user found
        {
            //Set user to current session user
            req.session.user = user;

            //Login via passport
            req.login(email, function (err) {
                if (email == "admin@admin.com") {
                    console.log("Admin, forwarding to admin console");
                    // res.redirect("adminConsole");
                }
                /*else if (user.role="CSR")
                {
                    res.redirect("csrConsole");
                }*/
                else {
                    console.log("Customer found, forwarding to feedback page");
                    res.redirect("feedback");
                }
            });
        }
    });
};

//------------------------------FEEDBACK FUNCTIONS-------------------------------//

const getFeedbackCount = function (req, res, id) {
    var count;
    var userEmail = null;
    userModel.findById(id).exec((err, user) => {
        if (err) {
            res.json({
                message: "Error occured"
            });
            console.log(err);
        };
        if (!user) return next(new Error('Failed to load User '
            + id));
        userEmail = user.email;
    });
    feedbackModel.find({ email: userEmail }).exec((err, feedbacks) => {
        if (err) {
            return next(err)
        }
        if (!feedbacks) {
            count = 0;
            res.json({
                message: "Error in fetching Feedback Count",
                count
            });
        } else {
            count = feedbacks.length;
            res.json({
                message: "Success in fetching Feedback Count",
                count
            });
        }




    });
};

const getUserFeedback = function (req, res, id) {
    var count;
    var userEmail = null;
    userModel.findById(id).exec((err, user) => {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User '
            + id));
        userEmail = user.email;
    });
    feedbackModel.find({ email: userEmail }).exec((err, feedbacks) => {
        if (err) {
            res.json({
                message: "Error occured"
            });
            console.log(err);
        }
        if (!feedbacks) {
            res.json({
                message: "No feedbacks were found"
            });
        } else {
            res.json({
                message: "Success in fetching Feedbacks",
                feedbacks
            });
        }




    });
};

const createFeedback = function (req, res) {
    const feed = {};
    const newFeedback = new feedbackModel(req.body);
    newFeedback.save(function (err) {
        if (err) {
            res.json({
                message: "Error occured"
            });

            console.log(err);
        } else {
            res.json({
                message: "Feedback successfully added to database",
                feedbackID: newFeedback._id
                //not sure about this let know if it works
            });
        }

    })
};

const deleteFeedback = function (req, res, id) {
    const feedback;
    feedbackModel.findById(id).exec((err, feed) => {
        if (err) {
            res.json({
                message: "Error occured"
            });
            console.log(err);
        }
        if (!feed) {
            res.json({ message: "failed to load feedback" });
        }
        feedback = feed;
    });
    feedback.remove((err) => {
        if (err) {
            return json({
                message: "Error occured"
            });
            console.log(err);
        } else {
            res.json({
                message: "Successfully deleted the feedback"
            });
        }
    });
};


//---------------------ADMIN FUNCTIONS------------------------

// For create user just give the route to insertUser() function above

// for users there are 2 functions 1) to fetch all Customers 2) to fetch all CSR
const getAllCustomers = function (req, res,id) {
    userModel.find({ role: "Customer" }).exec((err, users) => {
        if (err) {
            res.json({
                message: "Error occured"
            });
            console.log(err);
        }
        if (!users) {
            res.json({
                message: "No Users were found"
            });
        } else {
            res.json({
                message: "Success in fetching Users",
                users
            });
        }




    });
};


const getAllCSR = function (req, res,id) {
    userModel.find({ role: "CSR" }).exec((err, users) => {
        if (err) {
            res.json({
                message: "Error occured"
            });
            console.log(err);
        }
        if (!users) {
            res.json({
                message: "No Users were found"
            });
        } else {
            res.json({
                message: "Success in fetching Users",
                users
            });
        }




    });
};


const deleteUser = function (req, res, id) {
    const user;
    userModel.findById(id).exec((err, usr) => {
        if (err) {
            res.json({
                message: "Error occured"
            });
            console.log(err);
        }
        if (!usr) {
            res.json({ message: "Failed to load User" });
        }
        user = usr;
    });
    user.remove((err) => {
        if (err) {
            return json({
                message: "Error occured"
            });
            console.log(err);
        } else {
            res.json({
                message: "Successfully deleted the User"
            });
        }
    });
};


// Populate yoou database manually first
const getAllCompanies = function (req, res,id) {
    companyModel.find().exec((err, companies) => {
        if (err) {
            res.json({
                message: "Error occured"
            });
            console.log(err);
        }
        if (!companies) {
            res.json({
                message: "No Companies were found"
            });
        } else {
            res.json({
                message: "Success in fetching Companies",
                companies
            });
        }




    });
};



// const listUsers = function(req,res){
//     userModel.find() .populate('creator', 'firstName lastName fullName').exec((err, articles) => {
//         if (err) {
//                 return res.status(400).send({
//                     message: getErrorMessage(err)
//                 });
//             } else {
//                 res.status(200).json(articles);
//             }
//         });
// }




//Logout
const logout = function (req, res) {
    req.logOut();
    res.redirect('/');
};



module.exports = { "insertUser": insertUser, "auth": auth, "reqAuth": reqAuth, "logout": logout, "insertFeedback": insertFeedback };