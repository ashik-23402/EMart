const Product = require("../Models/Product");
const CustomError = require("../Utils/CustomError");


exports.createProduct = async(req,res,next)=>{

    try {
        req.body.seller = req.user.id;
    
        const product = await Product.create(req.body);

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