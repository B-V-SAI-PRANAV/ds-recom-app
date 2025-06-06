//full user schema 
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    verificationToken:{type:String},
    knownTopics:[{type:mongoose.Schema.Types.ObjectId,ref:'Topic'}],
    solvedQuestions:Number,
    unSolvedQuestions:Number,
    dailyQuestionHistory:[
        {
            questionId:{type:mongoose.Schema.Types.ObjectId,ref:'Question'},
            answeredAt:Date
        },
    ]
})

const User=mongoose.model('User',userSchema);
export default User;