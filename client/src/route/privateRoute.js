import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    const location = useLocation();
    const auth = useSelector(state => state.status.isAuthenticated);
    
    return(
        <Route {...rest} >
            {auth ? <Component></Component>
                : <Redirect to={{pathname: '/', state: {from : location}}} />
            }
        </Route>
    )
}

export default PrivateRoute;