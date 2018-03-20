/*jshint esversion: 6 */

const mongoose = require ('mongoose');
const schema = mongoose.Schema;

//Create a schema
const feedbackSchema= new schema({
    name:
    [{ 
        type: Schema.Types.ObjectId, 
        ref: 'userModel' 
    }],

    email:
    {
        type:String,
        required:true,/* built in validator  */
        minlength:3, /* built in validator  */
    },

    feedback:
    {
        type:String,
        minlength:3, /* built in validator  */
    }
},
{
    collection: "feedback"
});

//Create a model
const feedback= mongoose.model("feedback", feedbackSchema);

//Export the model
module.exports=feedback;