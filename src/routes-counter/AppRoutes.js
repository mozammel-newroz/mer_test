import React from "react";
import {
  BrowserRouter,
  Switch,
  isAuthenticate,
  Login,
  Dashboard,
  Transactions,
  BasicInfo,
  ForgotPassword,
  RouteWithLayout,
  PrivateRouteWithLayout,
  Main,
} from "../common-counter";

const AppRoutes = () => (
  <BrowserRouter forceRefresh={true}>
    <Switch>
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
      <PrivateRouteWithLayout path="/counter-panel/dashboard" component={Dashboard} exact />
      <PrivateRouteWithLayout path="/counter-panel/basic-info" component={BasicInfo} exact />
      <PrivateRouteWithLayout
        path="/counter-panel/transactions"
        component={Transactions}
        exact
      />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;
