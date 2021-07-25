import React from "react";
import { Route, Redirect, Header, isAuthenticate } from "../common-counter";

export default function PrivateRouteWithLayout({
  component: Component,
  ...rest
}) {
  return (
    <>
      <Header />
      <Route
        render={(props) =>
          isAuthenticate() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/counter-panel/login",
                state: { from: props.location },
              }}
            />
          )
        }
        {...rest}
      />
    </>
  );
}
