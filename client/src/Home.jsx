import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulated login check for demonstration purposes
  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clear authentication tokens
    // For demonstration purposes, we'll remove a simulated flag from localStorage
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2>Anahis Store</h2>
      <nav>
        <ul>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/category">Catalog</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {isLoggedIn && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Home;
