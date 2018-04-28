const companyModel=require("../model/company.model");
const feedbackModel=require("../model/feedback.model");
const userModel=require("../model/user.model");

const getAllCompanies = function (req, res)
{
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

const getTotalCompanyCount= function(req, res)
{
    companyModel.count(function (err, countObj)
    {
        if (err)
        {
            console.log(err);
            res.json({'error':err});
        }
        if (!countObj)
        {
            console.log("No company found");
            res.json({'error': "No company found"});
        }
        else
        {
            res.json({'count': countObj});
        }
    })
};

const updateCompany= function(req, res)
{
    const ret = {};
    companyModel.findByIdAndUpdate(req.params.id, req.body, {upsert: true}, function (err, companyObj)
    {
        if (err)
        {
            ret.msg = err.message;
            res.json(ret);
        }
        else {
            res.json({'company': companyObj});
        }
    })
};

const addCompany= function(req, res)
{
    const ret = {};
    const company= new companyModel(req.body);
    company.save( function (err, companyObj)
    {
        if (err)
        {
            ret.msg = err.message;
            res.json(ret);
        }
        else
        {
            res.json({'company': companyObj});
        }
    })
};

const deleteCompany= function(req, res)
{
    const ret = {};
    companyModel.findByIdAndRemove(req.params.id, function (err, companyObj)
    {
        if (err)
        {
            ret.msg = err.message;
            res.json(ret);
        }
        else
        {
            res.json({'company': companyObj});
        }
    })
};

const getAllUser = function (req, res)
{
    const ret = {};
    userModel.find({}, function (err, userObj)
    {
        if(err)
        {
            ret.msg = err.message;
            res.json({ ret });
        }
        if(!userObj)
        {
            ret.msg = "No company found";
            res.json({ ret });
        }
        else {
            res.json({'users': userObj});
        }
    })

};

const getAllFeedback = function (req, res)
{
    const ret = {};
    feedbackModel.find({}, function (err, feedbackObj)
    {
        if(err)
        {
            ret.msg = err.message;
            res.json({ ret });
        }
        if(!feedbackObj)
        {
            ret.msg = "No feedback found";
            res.json({ ret });
        }
        else
        {
            res.json({'feedback': feedbackObj});
        }
    })

};

const getUserDetails = function (req, res)
{
    const ret = {};
    userModel.findById(req.params.id, function (err, userObj)
    {
        if(err)
        {
            ret.msg = err.message;
            res.json({ ret });
        }
        if(!userObj)
        {
            ret.msg = "No company found";
            res.json({ ret });
        }
        else {
            res.json({'user': userObj._id, 'firstName': userObj.firstName,'lastName': userObj.lastName, 'email': userObj.email});
        }
    })

};

const getFeedbackDetails = function (req, res)
{
    const ret = {};
    feedbackModel.findById(req.params.id, function (err, feedbackObj)
    {
        if(err)
        {
            ret.msg = err.message;
            res.json({ ret });
        }
        if(!feedbackObj)
        {
            ret.msg = "No feedback found";
            res.json({ ret });
        }
        else {
            res.json({'feedback': feedbackObj._id, 'firstName': feedbackObj.firstName,'lastName': feedbackObj.lastName, 
                'email': feedbackObj.email, 'date': feedbackObj.date, 'company': feedbackObj.company, 'comment': feedbackObj.feedback});
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
    "getTotalUserCount": getTotalUserCount,
    "getUserDetails": getUserDetails,
    "getAllUser": getAllUser,
    "getAllFeedback": getAllFeedback,
    "getFeedbackDetails": getFeedbackDetails,
    "getTotalCompanyCount": getTotalCompanyCount,
    "updateCompany": updateCompany,
    "addCompany": addCompany,
    "deleteCompany": deleteCompany};