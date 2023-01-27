const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

// @desc register a new user
// @route /api/register_user
// @access Public
const registerUser = asyncHandler(async(req,res) =>{
    const {name, email, password} = req.body;
    
    if(!name || !email || !password){
       res.status(400)
       throw new Error('Please include all fields')
    }

    // Find if user already exists
    const userExists = await User.findOne({email: email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid user data')
    }

})

// @desc login user
// @route /api/users/me
// @access Public
const loginUser = asyncHandler(async(req,res) =>{

    const {email,password} = req.body;
    console.log(password);
    const user = await User.findOne({email})
    const compare = await bcrypt.compare(password,user.password)

    if(user && compare){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Credentials')
    }

})

// Generating new token
const generateToken = (id) =>{
    return jwt.sign({id}, 'secret',{
        expiresIn:'30d'
    })
}

// @desc get current user
// @route /api/login_user
// @access Private

const getMe = asyncHandler(async(req,res)=>{
    const user = {
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
    }
    res.status(200).send(user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}