import React, { useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  let navigate = useNavigate();
  return (
    <Route
      {...rest} render={routeProps => !!currentUser ? ( <RouteComponent {...routeProps} /> ) : ( navigate('/login') ) }
    />
  );
};
export default PrivateRoute;