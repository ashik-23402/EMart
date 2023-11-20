const Product = require("../Models/Product");
const CustomError = require("../Utils/CustomError");
const Seller = require("../Models/Seller")


exports.createProduct = async(req,res,next)=>{

    try {
        req.body.seller = await Seller.findOne({user:req.user.id});

        const seller = await Seller.findOne({user:req.user.id});


    
        const product = await Product.create(req.body);

        // update perticular seller products

        seller.products.push(product._id);

        await seller.save();

        // console.log(product._id);

        res.status(201).json({
            success:true,
            product
        })


    } catch (error) {

        console.log("error from ProductController");
        res.status(500).json({
            message:"creation failed on product controller",
        })
        
    }

    
}