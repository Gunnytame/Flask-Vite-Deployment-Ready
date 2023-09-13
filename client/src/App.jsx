import './App.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import User from './user';
import Sales from './sales';
import Login from './Login';
import AuthService from './Authentication';
import Category from './category';
import Home from './Home';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

//   React.useEffect(() => {
//       const user = AuthService.getCurrentUser();
//       if (user) {
//           setCurrentUser(user);
//       }
//   }, []);

//   const handleLogout = () => {
//       AuthService.logout();
//       setCurrentUser(null);
//   };

  return (
    <>
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
        </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;


// <Router>
// <Switch>
//     <Route path="/login" component={Login} />
//     <Route path="/user" component={User} />
//     {/* <Route
//         path="/sales"
//         render={() =>
//             currentUser ? (
//                 <Sales onLogout={handleLogout} />
//             ) : (
//                 <Redirect to="/login" />
//             )
//         }
//     /> */}
//     <Route path="/category" component={Category} />
//     <Route path="/checkout" component={Checkout} /> 
//     <Route path="/" component={Home} />
// </Switch>
// </Router>