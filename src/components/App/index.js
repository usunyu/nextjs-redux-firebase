import React from "react";
import { compose } from "recompose";

import Navigation from "../Navigation";
import withAuthentication from "../Session/withAuthentication";
import withAuthorization from "../Session/withAuthorization";

const App = ({ children }) => (
  <React.Fragment>
    <Navigation />
    <div className="app">
      {children}
    </div>
    <hr />
    <span className="footer">
      Star the{" "}
      <a href="https://github.com/usunyu/nextjs-redux-firebase">
        Repository
      </a>
    </span>
    <style jsx>{`
      .app {
        margin: 20px;
      }
      .footer {
        margin: 0px 20px;
      }
    `}</style>
  </React.Fragment>
);
const AppWithAuthentication = compose(
  withAuthentication,
  withAuthorization(false)
)(App);
const AppWithAuthorization = compose(
  withAuthentication,
  withAuthorization(true)
)(App);
export { AppWithAuthentication, AppWithAuthorization };
