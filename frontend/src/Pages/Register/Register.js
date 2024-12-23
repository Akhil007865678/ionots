import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('password', password);

        try {
            const response = await axios.post('http://localhost:4000/api/users/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error in register');
            console.error('Error during register:', error);
        }
    };

    return (
        <div className='signup'>
            <div className='signup_card'>
                <div className='signUp_title'>
                    Register
                </div>
                <form className='signUp_Inputs' onSubmit={handleSignUp}>
                    <input
                        type='text'
                        className='signUp_Inputs_inp'
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                        placeholder='User Name'
                    />
                    <input
                        type='password'
                        className='signUp_Inputs_inp'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder='Password'
                    />
                    <div className='signUpBtns'>
                        <button className='signUpBtn' type='submit'>
                            Register
                        </button>
                        <Link to={'/'} className='signUpBtn'>
                            Home Page
                        </Link>
                    </div>
                    {message && <p className='message'>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
