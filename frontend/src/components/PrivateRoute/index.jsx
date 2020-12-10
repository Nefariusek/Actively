import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Store from '../../Store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useContext(Store);
  return <Route {...rest} render={(props) => (isLogged ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export default PrivateRoute;
