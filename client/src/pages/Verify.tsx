import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from '../api/axios';

export default function verify(){
    const {token}=useParams();
    const [msg,setMsg]=useState("");

    useEffect(()=>{
        const verifyEmail=async()=>{
            try{
                const res=await axios.get(`/auth/verify/${token}`);
                setMsg(res.data);
            }catch(err:any){
                setMsg("Invalid or expired verification link");
            }
        };
        verifyEmail();
    },[token]);

    return(
        <div>
        <h2>Email verification</h2>
        <p>{msg}</p>
        </div>
    );

}