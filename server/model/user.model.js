const mongoose = require ('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const feedbackModel = mongoose.model("feedbacks").schema;
//Create a schema
const userSchema= new schema({
       
    firstName:
    {
        type:String,
        required: true, /* built in validator  */
        minlength:3/* built in validator  */
    },
    lastName:
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
    feedbacks: [{
        type: feedbackModel,
        ref: 'feedbacks',
        unique: true
    }]
},
{
    collection: "users"
});



// Schema Middleware tp Encrypt Password
userSchema.pre('save', function (next)
{
    //Ensure password is new or modified before applying encryption
    if (!this.isModified('password'))
    {
        return next();
    }
    //Apply encryption
    bcrypt.hash(this.password, null, null, (err, hash) =>
    {
        if(err) return next(err);//Ensure no errors
        this.password = hash; //Apply encryption to password
        next(); //Exit middleware
    });
});

//Method to compare password to encrypted password upon login
userSchema.methods.comparePassword= function (password)
{
    return bcrypt.compareSync(password, this.password); //Return comparison of login pass ro pass in database (true or false)
};

//Create a model
const User= mongoose.model("user", userSchema);

//Export the model
module.exports=User;