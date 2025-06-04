import React,{ useState } from "react";
import axios from "../api/axios"

const Register :React.FC=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');


    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const res=await axios.post('/auth/register',{email,password});
            setMessage(res.data.message);
        }catch(err:any){
            setMessage(err.response?.data?.message|| 'Registration Failed');
        }
    };

    return(
        <div>
            <h2>
                Register
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email"  value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default Register;