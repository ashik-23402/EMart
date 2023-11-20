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
        required:false,
    },
    contactPerson:{
        type:String,
        required:false,
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
        required:false
    },
    taxid:{
        type:String,
        required:false
    },
    payment:{
        method:{
            type:String,
            required:false
        },
        accountNumber:{
            type:String,
            required:false
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
        default:false
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