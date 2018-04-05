const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const FeedbackSchema = new Schema({

    complaintID: { type: String, unique: true, required: true },
    note: { type: String, required: true },
    date: { type: Date, required: true },
    company: { type: String, required: true },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    collection: "feedbacks"
});


const feedback= mongoose.model("Feedback", FeedbackSchema);


module.exports=feedback;