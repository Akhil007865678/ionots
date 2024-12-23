import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setLoginModal }) => {
  const navigate = useNavigate();
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { userName, password };

    try {
        const response = await axios.post('http://localhost:4000/api/users/login', loginData, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.success) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          document.cookie = `token=${token}; path=/`;
          
          setLoginModal(); // Close login modal
          navigate('/'); // Redirect to the home page after successful login
        }
        setMessage(response.data.message || 'Login successful');
    } catch (error) {
        setMessage(error.response?.data?.error || 'Error in login');
        console.error('Error during login:', error);
    }
  };

  return (
    <div className='login'>
      <div className='login_card'>
        <div className='titleCard_login'>
           Login
        </div>
        <form className='loginCredentials' onSubmit={handleLogin}>
            <div className='usernameLogin'>
                <input 
                  className='userNameLoginUserName' 
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  placeholder='User Name'
                  type='text'
                  required
                />
            </div>
            <div className='usernameLogin'>
                <input 
                  className='userNameLoginUserName' 
                  type='password'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder='Password'
                  required
                />
            </div>
            {message && <p className='message'>{message}</p>}
            <div className='login_buttons'>
                <button type='submit' className='login-btn'>Login</button>
                <Link to={'/signup'} onClick={() => setLoginModal()} className='login-btn'>SignUp</Link>
                <div className='login-btn' onClick={() => setLoginModal()}>Cancel</div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
