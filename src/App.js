// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Registration from './Registration';
import ThankYou from './ThankYou';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword'; // Import ResetPassword component
import SellNow from './SellNow';
import ChooseCategory from './ChooseCategory';
import AddProduct from './AddProduct';
import ProductDetails from './ProductDetails';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/signup" component={Registration} />
                    <Route path="/thank-you" component={ThankYou} />
                    <Route path="/login" component={Login} />
                    <Route path="/forget-password" component={ForgetPassword} />
                    <Route path="/reset-password/:token" component={ResetPassword} />
                    <Route path="/sell-now" component={SellNow} />
                    <Route path="/choose-category" component={ChooseCategory} />
                    <Route path="/add-product" component={AddProduct} />
                    <Route path="/product-details" component={ProductDetails} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
