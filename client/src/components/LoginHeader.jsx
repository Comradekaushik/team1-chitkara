// import React from 'react';
import "./LoginHeader.css";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginHeader() {
  const navigate = useNavigate();
  return (
    <div className="login-header-principal-container">
        
        <Link to="/home" id="login-header-logo-link">
                <div id="login-header-logo">Event-Project</div>
        </Link>
        <div className='login-header-signup-buttons-container'>
          {/* <div id="login-header-about-button-container">
            <Link to={"/login3"} id="login-header-about-button">About</Link> 
          </div> */}
          
          <div id="login-header-signup-button-container">
            <button id="login-header-signup-button" onClick={()=>{navigate("/signup")}}>Sign up</button>
          </div>

        </div>
        
    </div>
  )
}

export default LoginHeader