
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jsonwebToken = require('jsonwebtoken');

exports.hello=(req,res,next)=>{

    res.status(200).json({
        name:"lubna"
    })

}

exports.registerUser=async(req,res,next)=>{

    try {
        const{name,phoneNumber,email,password,birthdate,gender}=req.body;
        const existUser = await User.find({email});
        
        if (existUser.length > 0) {
            // Check if the user exists based on the result
            return res.status(500).json({
              error: true,
              messgae: "User already exists",
            });
          }
       
        
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            phoneNumber,
            email,
            password:hashPassword,
            birthdate,
            gender
        });

        const saveuser = await newUser.save();
        const responseUser = await User.findById(saveuser._id).select('-password');

        const token = jsonwebToken.sign({id:saveuser._id},process.env.secretkey,
            { expiresIn:process.env.jwtexpire});
        
        const cookieOptions = {
            maxAge:24*60*60*1000,
            httpOnly:true
        }

        res.status(201).cookie("token",token,cookieOptions).json({
            success:true,
            accessToken:token,
            responseUser
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            error:"internal server error"
        });
        
    }

}