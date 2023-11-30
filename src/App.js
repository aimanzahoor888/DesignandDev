// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Registration from './Registration';
import ThankYou from './ThankYou'; // Updated import statement
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import SellNow from './SellNow';
import AfterLogin from './AfterLogin';
import ChooseCategory from './ChooseCategory';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/signup" component={Registration} />
                    <Route path="/thank-you" component={ThankYou} /> {/* Updated route path */}
                    <Route path="/login" component={Login} />
                    <Route path="/forget-password" component={ForgetPassword} />
                    <Route path="/after-login" component={AfterLogin} />
                    <Route path="/choose-category" component={ChooseCategory} />
                    <Route path="/sell-now" component={SellNow} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
