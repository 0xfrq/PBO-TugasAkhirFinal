import React from 'react'
import './Login.css'
import'../../index.css'
import { useNavigate } from 'react-router-dom';
import Boy from '../../assets/boy.png';
import Woman from '../../assets/woman.png';
import Arrow from '../../assets/arrow.png';
import Google from '../../assets/google.png';
import Email from '../../assets/email.png';

const Login = () => {
  const navigate = useNavigate();
  const goToSignin = () => navigate("/Signin");
  return (
    <div className='page-wrapper'>
      <div className="container"> 
  
        <div className="imageboy">
          <img src={Boy} alt="User" className='avatarboy' />
          <img src={Woman} alt="User" className='avatarwoman' />
      </div>
  
      <div className='text'>
        <h1 className="text-white text-lg mb-2">Login to the application</h1>
        <p className="text-gray-400 mb-4">Sign in to synchronize your data.</p>
      </div>
      <hr className='hr' />
     
      <div className="button-container">
         
                <button onClick={goToSignin} className="google-button">
      
                  Log In
                  
                </button>
  
      </div>
    </div>

    </div>
  )
}

export default Login
