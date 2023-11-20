const CustomError = require('../Utils/CustomError');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Seller = require('../Models/Seller');


exports.isAuthenticateUser = async(req,res,next)=>{

    try {
        const {token} = req.cookies;

        if(!token){
            return next(new CustomError("please login to access this resource",401));
        }

        const decodeData =  jwt.verify(token,process.env.secretkey);

        req.user = await User.findById(decodeData.id);

        next();

    } catch (error) {

        console.log("error from isAuthenticate function");

        res.status(500).json({
            error:"internal server error"
        });
        
    }
}

exports.authorizeRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new CustomError(`Role : ${req.user.role} is not allowed to access this` ,403 ))
        }
        next();
    }
}


exports.isSellerVerified =async (req,res,next)=>{

    try {
        const seller = await Seller.findOne({user:req.user.id});

        //console.log(seller.sellerStatus);

        if(!seller.sellerStatus){
            return next(new CustomError(`seller should verify accoutn`,401));
        }

       

        next();
    } catch (error) {
        console.log(error);
    }

}

exports.setUserRole = (role)=>{
    return(req,res,next)=>{
        req.body.role = role;
        next();
    }
}




