import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import User from "./models/User";
import authRoutes from './routes/auth';
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json())
app.use("/api/auth",authRoutes);


app.get("/",(req,res)=>{
    res.send("DS topic recommender API is running");

});

app.get('/add-test-user', async(_req,res)=>{
    try{
        const user=new User({email:'test@example.com',password:'123456'});
        await user.save();
        res.send('Test user created succesfully');
    }
    catch(err){
        res.status(500).send('Error creating test user');
    }
})
//Wire routes to server (user authentication)
app.use(express.json());
console.log('authRoutes type:', typeof authRoutes); // Must log 'function' (because Router is a function)
// console.log('authRoutes type:', typeof authRoutes); // Should log "function"
console.log('authRoutes instance:', authRoutes); // Should log an object with route handlers


mongoose
    .connect(process.env.MONGO_URI!)
    .then(()=>{
        console.log("MongoDB connected");
        app.listen(process.env.PORT,()=>{
            console.log(`Server running on port http://localhost:${process.env.PORT}/`);
        });
    })
    .catch((err)=>{
        console.log('mongodb connection failed:',err);
    })

