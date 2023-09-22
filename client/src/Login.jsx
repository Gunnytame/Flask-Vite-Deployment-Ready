import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import axios from 'axios'; 

const API_BASE_URL = 'postgresql://username:your_password_here@localhost/db_name'; 

function Login() {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/login`, { username, password })
      .then((response) => {
        console.log('Login successful');
        history.push('/sales'); // Redirect to sales page on successful login
      })
      .catch((error) => {
        console.error('Login failed:', error.response.data.message);
        setLoginError('Invalid username or password.');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
      <NavLink to="/">Go back to Home</NavLink>
    </div>
  );
}

export default Login;
