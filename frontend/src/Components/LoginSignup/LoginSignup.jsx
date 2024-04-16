import React, { useState } from 'react';
import './LoginSignup.css';
import Popup from '../Popup/Popup.jsx'; 

import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(null);

  const resetFormFields = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setName('');
  };

  const signup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://0.0.0.0:8000/createaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
        name,
      }),
    });

    if (response.ok) {
        setAction('Login');
        resetFormFields();
      } else {
        const errorData = await response.json();
        setMessage(`Failed to create account: ${errorData.detail}`);
      }
  };

  let navigate = useNavigate(); 
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Request")
        console.log(data)
        if (data.message === "Login Successful") {
          // Store the username in localStorage
          console.log("Redirecting")
          localStorage.setItem('username', username);
          // Redirect to the home page
          navigate('/create/profile');
        } else {
          setMessage(`Failed to login: ${data.message}`);
        }
      } else {
        const errorData = await response.json();
        setMessage(`Failed to login: ${errorData.detail}`);
      }
    } catch (error) {
      setMessage('Error logging in:', error);
    }
  };
  
  
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (action === "Login") {
        login(e);
    } else if(action === "Sign Up"){
        signup(e);
    }
};

  return (
    <div className="container">
      <div className="header">
        <img className="logo" src="/resources/images/Instagram_text_logo.png" alt="Instagram Logo" />
        {/*<div className="text">{action}</div> */}
        <div className="underline"></div>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder={action==="Login"?"Username or Email":"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {action==="Sign Up"?<div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>: null}
          
          {action==="Sign Up"?<div className="input">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>: null}

          
          
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
        </div>
        <div className="text-prompt">
          {action==="Login"?<div className="forgot-password">
            Lost password? <span>Click Here</span>
          </div>: null}
        </div>
        

        <div className="submit-container">
            {action==="Sign Up"?<button className="submit" type='submit'>
            Sign Up
          </button>:<button className="submit" type='submit'>
            Login
          </button>}
          
        </div>

        <div className="text-prompt">
          {action==="Sign Up"?<a className="login" onClick={() => {setAction('Login'); resetFormFields();}}>
            Already have an account? Sign in
          </a>: null}
          {action==="Login"?<a className="signin" onClick={() => {setAction('Sign Up'); resetFormFields();}}>
            New here? <span>Create an account</span>
          </a>: null}
        </div>
      </form>
      {message && <Popup message={message} onClose={() => setMessage('')} />}
    </div>
    
  );
};

export default LoginSignup;