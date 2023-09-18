import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

function Login() {
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'exampleuser' && password === 'password') {
            console.log("logged in")
            history.push('/sales');  // Redirect to sales page on successful login
        } else {
            setLoginError('Invalid username or password.');
        }
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
