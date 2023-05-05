/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate , Link } from 'react-router-dom';
import Add from "../Images/a1.png";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
   

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Sign In Chat</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Display Email"/>
                <input type="password"placeholder="Display Password" />
                {err && <span>Something went wrong</span>}
                <button>Sign in</button>
            </form>
            <p>You don't have a account ?<Link to="/register"> Register</Link></p>
        </div>
    </div>
  )
}

export default Login