const feedbackModel=require("../model/feedback.model");
const feedbackCountModel = require("../model/feedbackCount.model");

const createFeedback = function (req, res)
{
    console.log(req.body);
    console.log("Date: "+ req.body.date + " Company: "+req.body.company+ " Feedback: "+req.body.feedback);

    const newFeedback = new feedbackModel(req.body);
    newFeedback.save(function (err, feedbackObj)
    {
        if (err)
        {
            console.log(err);
            res.json({message: "Error occured"});
        }
        if (!feedbackObj)
        {
            console.log("Feedback could not be inserted");
        }
        else
        {
            const newFeedbackCount = new feedbackCountModel(req.body);
            newFeedbackCount.save();
            res.json({'feedback': feedbackObj});
        }
    })
};

const getAllFeedbackCount= function(req, res)
{
    feedbackCountModel.count({'userId': req.params.id}, function (err, countObj)
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
}

module.exports= {"createFeedback": createFeedback,"getAllFeedbackCount": getAllFeedbackCount};