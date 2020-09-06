import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router';
// import { initUserSessionFromCookie } from 'pages/Auth/ducks/actions';
import { getSession } from 'utils/user';

/**
 * PrivateRoute is used to support the react router and it renders the routes
 * which is marked as private or is only accessible authenticated users
 * @param {React.Component} component
 */
const PrivateRoute = ({ component, ...rest }) => {
  const { defaultPath } = rest;
  const isAuthenticated = getSession() ? true : false;
  // if (isAuthenticated) {
  //   initUserSessionAction();
  // }
  const routeComponent = props =>
    isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: defaultPath }} />;
  return <Route {...rest} render={routeComponent} pageTitle="" />;
};

function mapStateToProps(state) {
  return { user: state.auth.user };
}

const mapDispatchToProps = () => {
  return {};
  //   return { initUserSessionAction: () => dispatch(initUserSessionFromCookie()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
