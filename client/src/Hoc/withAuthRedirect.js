import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let mapStateForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export const withAuthRedirect = (Component) => {
  const RedirectComponent = (props) => {
    if (!props.isAuth) return <Redirect to={'/login'} />;
    return <Component {...props} />;
  };

  const redirectAuthContainer = connect(mapStateForRedirect)(RedirectComponent);

  return redirectAuthContainer;
};
