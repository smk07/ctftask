const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const SECRET_KEY ="ITHUDAN VIDAI PERUVADHU UNGAL NAAN";

router.post('/signup', async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = new User({email,password})
        await user.save();

        const token = jwt.sign({userId:user._id},SECRET_KEY);
        return res.status(201).json({message:"Account Created Successfully!",token});
    }catch(err){
        console.log(err.message);
        return res.status(400).json({message:"User name already exists!"});
    }
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body

    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error()
        }
        await user.comparePassword(password);

        const token = jwt.sign({userId:user._id},SECRET_KEY);
        
        return res.status(200).json({message:"Logged in Successfully!",token});
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json({message:"Invalid Credentials"});
    }
})

module.exports = router;