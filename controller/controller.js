const userModel=require("../model/userModel");


//Function to check if the user is authenticated
const reqAuth= function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        res.redirect('/');
    }
    else
    {
        next();
    }
}


//Insert into db (Signup form)
const insert= function (req, res)
{
    //Add user to DB
    const feed={};

    //Retrieve data from form body
    const newUser= new userModel(req.body);
    newUser.save(function (err)
    {
        if(err)
        {
            feed.msg=err.message;
        }else
        {
            feed.msg= "User added successfully"
            console.log(req.body.email +" added to database");
        }
        res.render('signup', {data:feed});
    });

};


//Search DB for user for authentication
const auth= function(req, res)
{
    console.log("auth");
    //Autheticate user through db search
    const email= req.body.email;
    const password= req.body.password;

    userModel.findOne({email: email, password: password}, function(err, user)
    {
        console.log(email);
        console.log(password)
        const feed={};
        //If error found
        if (err)
        {
            console.log(err);
            feed.msg=err.message;
        }
        //If no user found
        if (!user)
        {
            console.log("User not found");
            feed.msg="No user found";
        }
        else //If user found
        {
            //Set user to current session user
            req.session.user= user;

            //Login via passport
            req.login(email, function (err)
            {
                if(email== "admin@admin.com")
                {
                    console.log("Admin, forwarding to admin console");
                    // res.redirect("adminConsole");
                }
                /*else if (user.role="CSR")
                {
                    res.redirect("csrConsole");
                }*/
                else
                {
                    console.log("Customer found, forwarding to feedback page");
                    res.redirect("feedback");
                }
            });
        }
    });
};
module.exports= {"insert": insert, "auth": auth, "reqAuth": reqAuth};