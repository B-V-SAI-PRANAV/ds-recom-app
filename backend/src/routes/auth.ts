//To add a register  route with email verification
import express,{Request,Response} from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router =express.Router();
//email transporter
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS,
    },
});

//register
router.post('/register',async (req:Request,res:Response)=>{
    const {email,password}=req.body;

    try{
        const existing=await User.findOne({email});
        if(existing){
            res.status(400).json({message:'User already exists'})
            return
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const verificationToken=jwt.sign({email},process.env.JWT_SECRET!,{expiresIn:'1d'});

        const newUser=new User({email,password:hashedPassword,verificationToken});
        await newUser.save();

        const verificationLink=`http://localhost:5000/api/auth/verify/${verificationToken}`;
        await transporter.sendMail({
            from:process.env.EMAIL,
            to:email,
            subject:'Verify your email',
            html:`<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`
        });
        res.status(201).json({message:'Verification email sent'});

    }catch(err){
        console.log(err);
        res.status(500).send('Error registering user');
    }
});

//verify email

router.get('/verify/:token',async (req:Request,res:Response)=>{
    const {token}=req.params;

    try{
        const decoded:any=jwt.verify(token,process.env.JWT_SECRET!);
        const user=await User.findOne({email:decoded.email});

        if(!user){
            res.status(400).send('Invalid Token');
            return
        }
        user.isVerified=true;
        user.verificationToken=undefined;
        await user.save();

        res.send('Email verified succesfully!');
    }catch(err){
        res.status(400).send('Invalid or expired token');
    }
});

//login 

router.post('/login',async(req:Request,res:Response)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if((!user)|| !user.isVerified){
            res.status(401).json({message:'Not verified or user Not found'});
            return;
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) {
            res.status(400).json({message:'Invalid Credentials'});;
            return
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET!,{expiresIn:'1d'});

        res.json({token,message:'Login successful!'});
    }catch(err){
        res.status(500).send('Error logging in');
    }
});
export default router;