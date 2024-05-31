const mongoose = require("mongoose");
const userSchema=mongoose.Schema({
    username:String,
    DOB:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})
const user=mongoose.model("User",userSchema);
module.exports=user;