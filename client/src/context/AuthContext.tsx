import React,{createContext,useContext,useState,useEffect,ReactNode} from "react";
import axios from '../api/axios';
import { AuthContextType } from "../types/AuthContextType";


//provides login, logout functionality to the app
//hold user state globally 
//store jwt locally 



const AuthContext=createContext<AuthContextType|undefined>(undefined);//creates new react context with AuthContextType

export const AuthProvider=({children}:{children:ReactNode})=>{//accepts the children(the rest of our app components)
    const [isAuthenticated,setIsAuthenticated]=useState<boolean>(()=>{//to track the authentication status
        return !!localStorage.getItem("token");//if token exists in localstorage (true-if exits , false-otherwise
    });

    const login=(token:string)=>{
        localStorage.setItem("token",token);
        setIsAuthenticated(true);
    };
    
    const logout=()=>{
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
//creates a convinient hook for accessing auth context

export const useAuth=()=>{
    const context=useContext(AuthContext);
    if(!context) throw new Error("use Auth must be used inside Auth Provider");
    return context;
};

