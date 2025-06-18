const asyncHandler = require("express-async-handler")
const bcrypt=require('bcrypt')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

const registeruser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body
    if(!username||!email||!password){
        res.status(400)
        throw new Error("All fields are mandaroty")
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400)
        throw new Error("User already existed")
    }
    const hashedpassword=await bcrypt.hash(password,10)
    console.log("hashed password:",hashedpassword);
    const user=await User.create({
        username,
        email,
        password:hashedpassword
    })
    console.log(`user created successfully${user}`)
    if(user){
        res.status(200).json({_id:user.id, email:user.email})
    }
    else{
        res.status(400)
        throw new Error("Data is invalid")
    }
    // res.json({message:"Welcome to register page"})
});

const loginuser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandaroty")
    }
    const user=await User.findOne({email});
    //time to compare password with cilent password
    if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id

            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"})
        res.status(200).json({accessToken})
    }
    else{
        throw new Error("Enter valid details")
    }

    // res.json({message:"welocme to login page"})
});

const currentuser=asyncHandler(async(req,res)=>{
    res.json(req.user)
});

module.exports={registeruser,loginuser,currentuser}