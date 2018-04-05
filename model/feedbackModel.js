var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    complaint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint'
    },
    note: { type: String, required: true }
    
});
{
    collection: "feedbacks"
});


const feedback= mongoose.model("Feedback", FeedbackSchema);



module.exports=feedback;