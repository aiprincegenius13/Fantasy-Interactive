// Login.jsx
import React, { useState } from 'react';
import useStore from '../store';
import '../assets/styles/Login.css'; // Import the CSS file for styling./Login.css';

const API_URL = "http://localhost:8081/api";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore(state => state.setUser);
  const setScreen = useStore(state => state.setScreen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(username);
        setScreen('customization');
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br/>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
