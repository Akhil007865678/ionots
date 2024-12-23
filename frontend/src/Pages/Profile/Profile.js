import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // You can customize the styling

const Profile = () => {
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to fetch accepted projects
    const fetchAcceptedProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/profile/accepted-projects', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setAcceptedProjects(response.data.acceptedProjects);
        setLoading(false);
      } catch (err) {
        setError('Failed to load accepted projects.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchAcceptedProjects();
  }, []); // Run this effect once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      <h1>Your Accepted Projects</h1>
      {acceptedProjects.length === 0 ? (
        <p>No accepted projects yet.</p>
      ) : (
        <div className="projects-list">
          {acceptedProjects.map((project) => (
            <div key={project.userId} className="project-card">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p>Status: {project.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

