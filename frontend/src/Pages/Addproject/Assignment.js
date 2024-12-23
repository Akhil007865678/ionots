import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './assignment.css';

const Assignment = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');
    console.log(token);  // Check if the token is available

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create FormData object with the necessary fields
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        
        try {
            const response = await axios.post('http://localhost:4000/api/projects/assign', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Include the JWT token in the header
                },
                withCredentials: true,  // This is useful if your server is handling cookies
            });
    
            // Set success or failure message based on the server response
            setMessage(response.data.message || 'Assignment uploaded successfully');
            if (response.data.success) {
                // Optionally redirect to another page after success (e.g., homepage)
                navigate('/');
            }
        } catch (error) {
            setMessage('Error uploading assignment');
            console.error('Error uploading assignment:', error);
        }
    };
    

    return (
        <div>
            <div className='videoUpload'>
                <div className='uploadBox'>
                    <div className='uploadVideoTitle'>
                        Upload Assignment
                    </div>
                    <div className='uploadForm'>
                        <input
                            type='text'
                            placeholder='Title of assignment'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className='uploadFormInput'
                        />
                        <input
                            type='text'
                            placeholder='Description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className='uploadFormInput'
                        />
                    </div>
                    <div className='uploadBtn'>
                        <div className='uploadBtn_form' onClick={handleSubmit}>Upload</div>
                        <div className='uploadBtn_form' onClick={() => navigate('/')}>Home</div>
                    </div>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Assignment;
