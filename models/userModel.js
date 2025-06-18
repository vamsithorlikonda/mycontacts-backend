const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"User name is mandatory"]

    },
    email:{
        type:String,
        required:[true,"Email is mandatory"],
        unique:[true,"This email is already taken"]
    },
    password:{
        type:String,
        required:[true,"password is mandatory"],

    }
},{
    timestamps:true
});

module.exports=mongoose.model("user",userSchema);