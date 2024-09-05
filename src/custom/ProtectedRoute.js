import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Get the authentication status
  const isAuthenticated = useIsAuthenticated();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? ( // Use isAuthenticated directly
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;