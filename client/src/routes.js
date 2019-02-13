import React from "react";
import { Redirect, Router, Route } from "react-router-dom";
//import App from "./App.js";
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history.js';

// =======================
// PAGES
// =======================
import Main from "./pages/Main";
import TestPage from "./pages/TestPage"
import Profile from "./pages/Profile"


const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

// const renderMergedProps = (component, ...rest) => {
//   const finalProps = Object.assign({}, ...rest);
//   return (
//     React.createElement(component, finalProps)
//   );
// }

// const PropsRoute = ({ component, ...rest }) => {
//   return (
//     <Route {...rest} render={routeProps => {
//       return renderMergedProps(component, routeProps, rest);
//     }}/>
//   );
// }

// const PrivateRoute = ({ component, redirectTo, ...rest }) => {
//   return (
//     <Route {...rest} render={routeProps => {
//       return auth.loggedIn() ? (
//         renderMergedProps(component, routeProps, rest)
//       ) : (
//         <Redirect to={{
//           pathname: redirectTo,
//           state: { from: routeProps.location }
//         }}/>
//       );
//     }}/>
//   );
// };



export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route exact path={"/"} render={(props) => <Main  {...props} />} />
        <Route exact path={"/home"} render={(props) => <Main  {...props} />} />
        <Route exact path={"/test"} render={(props) => <TestPage  {...props} />} />
        <Route exact path={"/testdata"} render={(props) => <Main  {...props} />} />
        {/* <Route exact path={"/testdata"} render={(props) => <TestPage  {...props} />} /> */}
        <Route exact path={"/callback"} render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />
        }} />
        <Route exact path={"/profile"} render={(props) => (
          !auth.isAuthenticated() ? (
            <Redirect to="/home" />
          ) : (
              <Profile auth={auth} {...props} />
            )
        )} />
        {/* <PrivateRoute path='/profile' component={Profile} redirectTo="/main" auth={auth} /> */}
        {/* <Articles /> */}
      </div>
    </Router>
  );
};
