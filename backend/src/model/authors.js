const mongoose=require("mongoose");
const user_schema=mongoose.Schema({
 
    author:String,
    age:Number,
    dob:String,
    book:String,
    published:String,
    price:Number
})
module.exports=mongoose.model("authors",user_schema);