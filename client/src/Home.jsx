import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulated login check for demonstration purposes
  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault()
    fetch("/api/logout",{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json"
      }
    })
    // localStorage.setItem('isLoggedIn', 'false');
    // setIsLoggedIn(false);
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
          <li>
            <Link to="/UpdateEmail">UpddateEmail</Link>
          </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
