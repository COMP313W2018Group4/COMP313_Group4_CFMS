/*jshint esversion: 6 */

const mongoose = require ('mongoose');
const schema = mongoose.Schema;

//Create a schema
const companySchema= new schema({

        name:
            {
                type:String,
                required: true, /* built in validator  */
                minlength:3 /* built in validator  */
            },
        Address:
            {
                type:String,
                required:true,/* built in validator  */
                minlength:3 /* built in validator  */
            }
    },
    {
        collection: "companies"
    });

//Create a model
const company= mongoose.model("Company", companySchema);

//Export the model
module.exports=company;