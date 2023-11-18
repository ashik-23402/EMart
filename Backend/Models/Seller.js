const mongoose = require('mongoose');

const {Schema} = mongoose;

const SellerSchema = new Schema({

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        unique:true,
        required:true
    },
    companyName:{
        type:String,
        required:[true,"companyName needed"],
    },
    contactPerson:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    taxid:{
        type:String,
        required:true
    },
    payment:{
        method:{
            type:String,
            required:true
        },
        accountNumber:{
            type:String,
            required:true
        }
    },
    products:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Product"
        }
    ],
    sellerStatus:{
        type:Boolean,
        default:true
    },
    sellerRating:{
        type:Number,
        default:0
    },
    registeredAt:{
        type:Date,
        default:Date.now
    }

    

});


const Seller = mongoose.model("Seller",SellerSchema);

module.exports=Seller;