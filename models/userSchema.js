const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        nom:String,
        //nom:{type:String,required:true,default:""},
        prenom:String,
        age:Number,
        address:String,        
    },{timestamps:true}
);
const User= mongoose.model("User", userSchema);
module.exports= User;
