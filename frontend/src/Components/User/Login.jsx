import React, { useState } from 'react'
import "./Login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://cardexbackend.eu.pythonanywhere.com/api/login/",

        {username, password,}
      )

      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      navigate("/");
    } catch (err) {
      setError ("Invalid username or password");
    }
  }


  return (
    <div className='loginContainer'>
        <h2 className='loginTitle'>Welcome To Cardex</h2>
        <p>Please Login to continue or SignUp to create an account</p>
        <div className='loginInput'>
            <img src="" alt="user avatar" className='loginAvatar' />
            <form onSubmit={loginSubmit}>
              <input type="text" placeholder=' Enter Username' className='loginUser' value={username} onChange={(e) => setUsername(e.target.value)} required/>
              <input type="password" placeholder='Enter password' className='loginPass' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className='loginRecover'><input type="checkbox" /> Remember me
              <span className='loginForgotPass'>Forgot Password</span>
              </div>

              {error && <p className='errorText'>{error}</p>}
              <button type='submit' className='loginSubmit'>Submit</button>
            </form>
        </div>
    </div>
  )
  
}

export default Login;
