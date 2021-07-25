import React from "react";
import ReactDOM from "react-dom";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  isAuthenticate,
  Login,
  Dashboard,
  Transactions,
  BasicInfo,
  ForgotPassword,
  RouteWithLayout,
  PrivateRouteWithLayout,
  Main,
} from "./common-counter";
import "./App-counter.css";


import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/font-awesome/css/all.min.css";
import "./assets/vendor/bootstrap-select/css/bootstrap-select.min.css";
import "./assets/vendor/currency-flags/css/currency-flags.min.css";
import "./assets/vendor/daterangepicker/daterangepicker.css";
import "./assets/vendor/owl.carousel/assets/owl.carousel.min.css";
import "./assets/css/stylesheet.css";

import LoginM from "../src/components/auth/login";
import SignUp from "../src/components/auth/SignUp";
import ForgotPass from "../src/components/auth/ForgotPass";
import DashboardM from "../src/components/dashboard";
import ChangePassword from "../src/components/ChangePassword";
import TransactionPage from "../src/components/TransactionPage";
import Home from "../src/components/Home";
import Withdraw from "../src/components/Withdraw";
import RequestMoney from "../src/components/RequestMoney";
import Refund from "../src/components/Refund";
import Store from "../src/components/Store";
import AddStore from "../src/components/AddStore";
import NotificationPage from "./components/NotiicationPage";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
// import NotFound from "./components/NotFound";
// import Navbar from "../src/components/Navbar";
import Wrapper from "./components/Wrapper";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidWxmZXQ5NCIsImEiOiJja29qbzB1dnQwOGVuMnBxa2hsZnVqc2RxIn0.051-M2ZFz-A2Qy9u-oMWaA";

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

ReactDOM.render(
  <Wrapper>
    <React.Fragment>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {/* <Navbar /> */}
      <Router forceRefresh={true}>
        <Switch>
          <Route exact path="/forgotpassword" component={ForgotPass} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={DashboardM} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/transactions" component={TransactionPage} />
          <Route exact path="/notifications" component={NotificationPage} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/store/add-store" component={AddStore} />

          <Route exact path="/withdraw" component={Withdraw} />
          <Route exact path="/requestpayment" component={RequestMoney} />
          {/* <Route path="/deposit" component={Deposit} /> */}
          <Route exact path="/refund" component={Refund} />
           <Route path="/signup" component={SignUp} /> 
          <Route exact path={["/", "/login"]} component={LoginM} />
          {/* <Route component={NotFound} /> */}

          {/* Counter Routes */}
          {!isAuthenticate() && (
            <RouteWithLayout layout={Main} exact path="/counter-panel/login" component={Login} />
          )}
          <RouteWithLayout layout={Main} path="/counter-panel/login" component={Login} exact />
          <RouteWithLayout
            layout={Main}
            path="/counter-panel/forgot-password"
            component={ForgotPassword}
            exact
          />
          <PrivateRouteWithLayout
            path="/counter-panel/dashboard"
            component={Dashboard}
            exact
          />
          <PrivateRouteWithLayout
            path="/counter-panel/basic-info"
            component={BasicInfo}
            exact
          />
          <PrivateRouteWithLayout
            path="/counter-panel/transactions"
            component={Transactions}
            exact
          />
        </Switch>
      </Router>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  </Wrapper>,

  document.getElementById("root")
);
