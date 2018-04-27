const companyModel=require("../model/company.model");
const feedbackModel=require("../model/feedback.model");
const userModel=require("../model/user.model");

const getAllCompanies = function (req, res)
{
    console.log("looking for companies");
    const ret = {};
    companyModel.find({}, function (err, companyObj)
    {
        if(err)
        {
            ret.msg = err.message;
            res.json({ ret });
        }
        if(!companyObj)
        {
            ret.msg = "No company found";
            console.log(ret.msg);
            res.json({ ret });
        }
        else {
            console.log(companyObj);
            res.json({'companies': companyObj});
        }
    })

};


const getTotalFeedbackCount= function(req, res)
{
    feedbackModel.count(function (err, countObj)
    {
        if (err)
        {
            console.log(err);
            res.json({'error':err});
        }
        if (!countObj)
        {
            console.log("No feedback count found");
            res.json({'error': "No feedback count"});
        }
        else
        {
            res.json({'count': countObj});
        }

    })
};


const getTotalUserCount= function(req, res)
{
    userModel.count(function (err, countObj)
    {
        if (err)
        {
            console.log(err);
            res.json({'error':err});
        }
        if (!countObj)
        {
            console.log("No feedback count found");
            res.json({'error': "No feedback count"});
        }
        else
        {
            const ret= countObj-1;
            console.log(countObj);
            console.log(ret);
            res.json({'count': ret});
        }

    })
};

module.exports= {"getAllCompanies": getAllCompanies,
    "getTotalFeedbackCount": getTotalFeedbackCount,
    "getTotalUserCount": getTotalUserCount};