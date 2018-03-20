/*jshint esversion: 6 */

const mongoose = require ('mongoose');
const schema = mongoose.Schema;

//Create a schema
const userSchema= new schema({
       
    firstname:
    {
        type:String,
        required: true, /* built in validator  */
        minlength:3/* built in validator  */
    },
    lastname:
    {
        type:String,
        required:true,/* built in validator  */
        minlength:3, /* built in validator  */
    },
    email:
    {
        type:String, 
        required:true,/* built in validator  */
        minlength:3, /* built in validator  */
    },
    password:
    {
        type:String,
        minlength:3, /* built in validator  */
    },
    feedback:
    {
        type:String,
        minlength:3, /* built in validator  */
    }

},
{
    collection: "customer"
});

//Create a model
const User= mongoose.model("user", userSchema);

//Export the model
module.exports=User;