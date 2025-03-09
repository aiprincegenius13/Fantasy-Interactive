import React, { useState } from 'react';
import useStore from '../store';

const API_URL = "http://localhost:8081/api";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useStore(state => state.setUser);
  const setScreen = useStore(state => state.setScreen);
  const setGameState = useStore(state => state.setGameState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        setUser(username);
        if (data.user.gameState) {
          // Load saved game state if it exists
          setGameState(data.user.gameState);
          setScreen('game');
        } else {
          setScreen('customization');
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="screen">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login / Create Account</button>
      </form>
    </div>
  );
}

export default Login;
