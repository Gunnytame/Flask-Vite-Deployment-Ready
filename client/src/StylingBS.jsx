import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import '/bootstrap.min.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Cry About It
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales">
                Sales
              </NavLink>
            </li>
            {}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-pink">Welcome to the Cry About It Home Page</h2>
      <div className="heart">&#x2665;</div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-pink">Login Page</h2>
      <div className="heart">&#x2665;</div>
    </div>
  );
};

const SignUp = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-pink">Sign Up Page</h2>
      <div className="heart">&#x2665;</div>
    </div>
  );
};

const Sales = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center text-pink">Sales Page</h2>
      <div className="heart">&#x2665;</div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/sales" component={Sales} />
      </Switch>
    </Router>
  );
};

export default App;

