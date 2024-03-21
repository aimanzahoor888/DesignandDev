import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Registration from './Registration';
import ThankYou from './ThankYou';
import Login from './Login';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import SellNow from './SellNow';
import ChooseCategory from './ChooseCategory';
import AddProduct from './AddProduct';
import AddClothes from './AddClothes';
import ProductDetails from './ProductDetails';
import SellerInfo from './SellerInfo';
import ProductPreview from './ProductPreview';
import BuyerInfo from './BuyerInfo'; 
import Billing from './Billing';
import AboutUs from './AboutUs'; 
import LiveChatBot from './LiveChatBot'; // Import the LiveChatBot component
import OrderConfirmation from './OrderConfirmation';

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
          <Route path="/add-clothes" component={AddClothes} />
          <Route path="/product-details" component={ProductDetails} />
          <Route path="/seller-info" component={SellerInfo} />
          <Route path="/product-preview/:productId" component={ProductPreview} />
          <Route path="/buyer-info/:productId" component={BuyerInfo} />
          <Route path="/billing/:productId" component={Billing} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/live-chat-bot" component={LiveChatBot} />
          <Route path="/order-confirmation" component={OrderConfirmation} /> 
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
