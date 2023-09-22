import React, { useState } from 'react';
import SignupSuccessPopup from './SignUpPopUp';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

const AuthService = {
  register: (email, password, username) => {
    return axios.post(`${API_BASE_URL}/signup`, { email, password, username });
  },
};

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    AuthService.register(email, password, username)
      .then(() => {
        setShowSuccessPopup(true);
      })
      .catch((error) => {
        setRegistrationError(error.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {showSuccessPopup ? (
        <SignupSuccessPopup onClose={closePopup} />
      ) : (
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      )}
      {registrationError && <p>{registrationError}</p>}
      <NavLink to="/">Go back to Home</NavLink>
    </div>
  );
}

export default SignUp;
