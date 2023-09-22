import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Sales from './sales';
import Login from './Login';
import Category from './category';
import Checkout from './Checkout';
import Home from './Home';
import Cart from './Cart';
import SignUp from './SignUp';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogout = () => {
        setCurrentUser(null);
    };

    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/sales">
                    {currentUser ? <Sales onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/signup" component={SignUp} />
                <Route path="/category" component={Category} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/cart" component={Cart} />
                <Route exact path="/" component={Home} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
}

export default App;
