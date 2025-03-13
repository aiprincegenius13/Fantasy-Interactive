import React, { useState } from 'react';
import useStore from '../store';

// Updated API_URL: Removed the "/api" suffix so that the endpoint matches the server routes.
const API_URL = "http://localhost:8081";

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
      // Check if response is OK before parsing JSON.
      if (!response.ok) {
        // If the response is not OK, parse text for error details.
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      setUser(username);
      setScreen('customization');
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
