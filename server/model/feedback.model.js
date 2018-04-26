const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const feedbackSchema = new Schema
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
    collection: "feedbacks"
});


const Feedback= mongoose.model("feedbacks", feedbackSchema);


module.exports= Feedback;