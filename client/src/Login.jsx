import React, { useState } from 'react';
import AuthService from './Authentication';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        AuthService.login(username, password)
            .then(() => {
                props.history.push('/sales');
            })
            .catch((error) => {
                setLoginError(error.response.data.message);
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
        </div>
    );
}

export default Login;
