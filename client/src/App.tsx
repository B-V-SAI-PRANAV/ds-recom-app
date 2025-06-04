//wraps the entire app making login system available everywhere 
import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import Verify from './pages/Verify';
import ProtectedRoute from "./components/ProtectedRoute";

const App:React.FC=()=>{
    return(
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                        }/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App;
