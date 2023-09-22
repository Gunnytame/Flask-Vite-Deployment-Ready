import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Sales from './sales';
import Login from './Login';
import Category from './category';
import Checkout from './Checkout';
import Home from './Home';
import Cart from './Cart';
import SignUp from './SignUp';
import UpdateEmail from './UpdateEmail';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    console.log(currentUser)
    const handleLogout = () => {
        setCurrentUser(null);
    };
    if(currentUser){
        return (
        <Router>
            <Switch>
                <Route path="/login" component={()=> <Login setCurrentUser={setCurrentUser}/>} />
                <Route path="/sales">
                    {currentUser ? <Sales onLogout={handleLogout} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/signup" component={()=> <SignUp setCurrentUser={setCurrentUser}/>} />
                <Route path="/category" component={Category} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/cart" component={Cart} />
                <Route exact path="/" component={Home} />
                <Route path="/UpdateEmail" component={()=> <UpdateEmail currentUser = {currentUser}/>} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
        )
    }
    else{
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={()=> <Login setCurrentUser={setCurrentUser}/>} />
                    <Route path="/sales">
                        {currentUser ? <Sales onLogout={handleLogout} /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/signup" component={()=> <SignUp setCurrentUser={setCurrentUser}/>} />
                    <Route path="/category" component={Category} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/cart" component={Cart} />
                    <Route exact path="/" component={Home} />
                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </Router>
        );
    }

    
}

export default App;
