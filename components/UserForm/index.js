import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', department: '' });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => setUser(response.data))
        .catch(() => setError('Failed to load user data'));
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
      : axios.post('https://jsonplaceholder.typicode.com/users', user);

    apiCall
      .then(() => navigate('/'))
      .catch(() => setError('Failed to save user data'));
  };

  return (
    <div className="user-form">
      <h1>{id ? 'Edit User' : 'Add User'}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={user.department}
          onChange={handleChange}
        />
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
