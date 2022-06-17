const mongoose=require("mongoose");
const user_schema=mongoose.Schema({
 
    name:String,
    email:String,
    password:String
})
module.exports=mongoose.model("newUser",user_schema);