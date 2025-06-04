import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Login:React.FC=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const {login}=useAuth();
    const navigate=useNavigate();

    const handleSubmit=async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            const res=await axios.post("/auth/login",{email,password});
            login(res.data.token);
            setMessage(res.data.message);
        }catch(err:any){
            setMessage(err.response?.data?.message||"Login failed");
        }
    };
    return(
        <div>
            <h2>Login</h2>
            <form
            onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>

            </form>
            <p>{message}</p>
        </div>
    )
}

export default Login;