import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

type Props = {
	isAuthenticated: boolean;
	children?: React.ReactNode;
} & RouteProps;

export const PrivateRoute = ({ isAuthenticated, children, ...rest }: Props) => {
	if (!isAuthenticated)
		return <Redirect to="/" />;

	return (
		<Route {...rest} render={() => children} />
	);
};

