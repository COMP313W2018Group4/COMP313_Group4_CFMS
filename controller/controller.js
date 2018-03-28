const userModel=require("../model/userModel");

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
            console.log("User added to database");
        }
        res.render('signup', {data:feed});
    });

};

module.exports= {"insert": insert};