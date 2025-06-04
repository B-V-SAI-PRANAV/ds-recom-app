//basic dashboard only accessible if logged in 

import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard:React.FC=()=>{
    const {logout}=useAuth();
    return(
        <div>
            <h2>Welcome to the Dashboard</h2>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
export default Dashboard;