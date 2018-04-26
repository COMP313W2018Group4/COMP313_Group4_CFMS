const companyModel=require("../model/company.model");

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


module.exports= {"getAllCompanies": getAllCompanies,};