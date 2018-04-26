const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const feedbackCountSchema = new Schema
({
    userId:
        {
            type:String,
            required: true
        },
    date:
        {
            type: String,
            required: true
        },
    company:
        {
            type: String,
            required: true
        },
    feedback:
        {
            type: String,
            required: true
        }
},
{
    collection: "feedbackCount"
});


const FeedbackCount= mongoose.model("feedbackCount", feedbackCountSchema);


module.exports= FeedbackCount;