import React from "react";
import { Router, Route } from "react-router-dom";
//import App from "./App.js";
import history from './history.js';

// =======================
// PAGES
// =======================
import Main from "./pages/Main";
import TestPage from "./pages/TestPage"

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path={"/"} render={(props) => <Main  {...props} />} />
        <Route exact path={"/home"} render={(props) => <Main  {...props} />} />
        <Route exact path={"/test"} render={(props) => <TestPage  {...props} />} />
        <Route exact path={"/testdata"} render={(props) => <Main  {...props} />} />
        {/* <Route exact path={"/testdata"} render={(props) => <TestPage  {...props} />} /> */}
        {/* <PrivateRoute path='/profile' component={Profile} redirectTo="/main" auth={auth} /> */}
        {/* <Articles /> */}
      </div>
    </Router>
  );
};
