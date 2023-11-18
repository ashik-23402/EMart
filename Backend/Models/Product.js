const mongoose = require('mongoose');

const{Schema} = mongoose;

const ProductSchema = new Schema({
    name:{
        type:String,
        required:[true,"productName required.."]
    },
    description:{
        type:String,
        required:[true,"description required..."]
    },
    category:{
        type:String,
        required:[true,"category needed"]
    },
    price:{
        type:Number,
        required:[true,"price needed"]
    },
    discountPrice:{
        type:Number,
        required:[true,"discount price needed"]
    },
    stockQuantity:{
        type:Number,
        required:[true,"quantity needed"]
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type: String,
                required:true
            }

        }
    ],
    availability:{
        type:Boolean,
        default:true,
        required:true
    },
    numofreviews:{
        type:Number,
        default:0
    },
    reviews:[

        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }

        }

    ] ,
    seller:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
   
   

});

const Product = mongoose.model("Product",ProductSchema);
module.exports=Product;