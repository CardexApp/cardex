import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        {username, password},
      )
    }
  }


  return (
    <div className='loginContainer'>
        <h2 className='loginTitle'>Welcome To Cardex</h2>
        <p>Please Login to continue or SignUp to create an account</p>
        <div className='loginInput'>
            <img src="" alt="user avatar" className='loginAvatar' />
            <form onSubmit={loginSubmit} action="">
              <input type="text" placeholder=' Enter Username' className='loginUser' />
              <input type="password" placeholder='Enter password' className='loginPass' />
              <div className='loginRecover'><input type="checkbox" /> Remember me
              <span className='loginForgotPass'>Forgot Password</span>
              </div>
              <button className='loginSubmit'>Submit</button>
            </form>
        </div>
    </div>
  )
  
}

export default Login;
