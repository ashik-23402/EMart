
const mongoose = require('mongoose');




const { Schema } = mongoose;

const UserSchema = new Schema({

    name:{
        type:String,
        required:[true,"you must enter your name"]
    },
    phoneNumber:{
        type:Number,
        required:[true,"you must enter your phone number"]
        // here need to validate number is it valid number or not
    },
    email:{
        type:String,
        required:[true,"you must give password"]
    },
    password:{
        type:String,
        required:[true,"you must give password"]
    },
    birthdate:{
        type:Date,
        required:[true,"you must give birthdate"]
    },
    gender:{
        type:String,
        required:[true,"you must give gender info"]
    },
    role:{
        type:String,
        enum:['normal','seller','admin'],
        default:'normal',
        required:[true,"role required"]
    }
    //we will add order later




});

module.exports=mongoose.model("User",UserSchema);




