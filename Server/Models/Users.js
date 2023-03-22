import mongoose from "mongoose";

const UserSchema =  mongoose.Schema(
{
    name :{
        type : String,
        required : true,
        unique : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    img : {
        type : String
    },
    Subscribers :{
        type : Number,
        default : 0
    },
    SubscribedUsers : {
        type : [String]
    },
    fromGoogle :{
        type : Boolean,
        default : false
    }
}, 
    {
        timestamps : true
    }
);

export default mongoose.model("User", UserSchema)