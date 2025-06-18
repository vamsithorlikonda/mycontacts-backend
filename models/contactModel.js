const { default: mongoose } = require("mongoose");

const connectSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    name:{
        type:String,
        required:[true,"please add name"]
    },
    email:{
        type:String,
        required:[true,"please add eamil"]
    },
    phone:{
        type:String,
        required:[true,"please add phone number"]
    },
    
},
{timestamps:true

    });

module.exports=mongoose.model("contact",connectSchema)