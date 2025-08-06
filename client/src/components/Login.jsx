// import React from 'react';

import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {

  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem("token")); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home"); 
    }
  }, [isAuthenticated, navigate]);
  
  
  return (
    <div id="login-path-principal-component">
      <LoginHeader/>
      
      <LoginForm/>
        
        
    </div>
  )
}

export default Login;