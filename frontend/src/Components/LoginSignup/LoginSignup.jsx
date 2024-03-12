import React, { useState } from 'react';
import './LoginSignup.css';
import insta_logo from '/Users/samuelshine/DevOps-Project/frontend/src/Components/resources/images/Instagram_text_logo.png';
const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Test');

  const resetFormFields = () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setName('');
  };

  const signup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/createaccount', {
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
        setMessage(data.username);
      } else {
        const errorData = await response.json();
        setMessage(`Failed to login: ${errorData.detail}`);
      }
    } catch (error) {
      setMessage('Error logging in:', error);
    }
  };
  

  return (
    <div className="container">
      <div className="header">
        <img className="logo" src={insta_logo}></img>
        {/*<div className="text">{action}</div> */}
        <div className="underline"></div>
      </div>
      <form onSubmit={action === "Login" ? login : signup }>
        <div className="inputs">
          <div className="input">
            <input
              type="text"
              placeholder={action==="Login"?"Username or Email":"Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {action==="Login"?null:<div className="input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>}
          
          {action==="Login"?null:<div className="input">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>}
          
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
          {action==="Sign Up"?null:<div className="forgot-password">
            Lost password? <span>Click Here</span>
          </div>}
        </div>
        

        <div className="submit-container">
            {action==="Sign Up"?<button className="submit" type='submit'>
            Sign Up
          </button>:<button className="submit" type='submit'>
            Login
          </button>}
          
        </div>

        <div className="text-prompt">
          {action==="Sign Up"?<a className="login" onClick={() => setAction('Login')}>
            Already have an account? Sign in
          </a>: null}
          {action==="Sign Up"?null:<a className="signin" onClick={() => setAction('Sign Up')}>
            New here? <span>Create an account</span>
          </a>}
        </div>
      </form>
    </div>
    
  );
};

export default LoginSignup;