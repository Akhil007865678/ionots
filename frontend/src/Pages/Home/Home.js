import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get('http://localhost:4000/api/projects/');
      setProjects(res.data);
    };

    fetchProjects();
  }, []);

  const handleAccept = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId; // Directly use the userId from the token
          
          const response = await axios.patch(
            'http://localhost:4000/api/projects/accept',
            { projectId, userId }, // Pass the decoded userId directly
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          setMessage(response.data.message);
        } catch (error) {
          console.error('Invalid token:', error);
          setMessage('Error accepting user');
        }
      }
    } catch (error) {
      console.error('Error accepting user:', error);
      setMessage('Error accepting user');
    }
  };

  const handleStatus = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await axios.post(
            'http://localhost:4000/api/projects/status',
            { projectId, userId, status: "pending" },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );

          alert('Assignment accepted');
          setMessage(response.data.message);
        } catch (error) {
          console.error('Invalid token:', error);
          setMessage('Error accepting user');
        }
      }
    } catch (error) {
      console.error('Error accepting user:', error);
      setMessage('Error accepting user');
    }
  };

  const updateStatus = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          await axios.patch('http://localhost:4000/api/projects/updatestatus',
            { projectId, userId, status: "complete" },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          alert('Project completed');
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    } catch (error) {
      console.error( error);
    }
  };

  const handleBoth = async (projectId) => {
    await handleAccept(projectId);
    handleStatus(projectId);
  };
  return (
    <div className='home'>
      <h1>Projects</h1>
      {projects.map((project) => (
        <div key={project._id} className='project'>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <p>Status: {project.status}</p>
          <div className='btns'>
            <button className='accept' onClick={() => handleBoth(project._id)}>Accept</button>
            <button className='user'>Accepted User</button>
            <button className='user' onClick={() => updateStatus(project._id)}>Completed</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
