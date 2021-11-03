import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

type Props = {
	isAuthenticated: boolean;
	children?: React.ReactNode;
} & RouteProps;

export const PrivateRoute = ({ isAuthenticated, children, ...rest }: Props) => {
	return <Route {...rest} render={({ location }) => (isAuthenticated ? children : <Redirect to={{ pathname: "/", state: { from: location } }} />)} />;
};

export default PrivateRoute;
