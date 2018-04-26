const feedbackModel=require("../model/feedback.model");

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
            res.json({'feedback': feedbackObj});
        }
    })
};


module.exports= {"createFeedback": createFeedback,};