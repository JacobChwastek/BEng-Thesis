import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "application/store/store";
import { PrivateRoute, PublicRoute } from "application/routing";
import { useUserMutation } from "domain/auth/store/api";
import { DashboardPage, LandingPage, LoginPage, RegisterPage, Viewer } from "./pages";
import { setLogOut, setUser } from "domain/auth/store/authSlice";

import "./App.scss"

const App = () => {
	const dispatch = useDispatch();
	const [getUser] = useUserMutation();
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);
	const user = useSelector((state: RootState) => state.auth.user);


	useEffect(() => {
		const verifyUser = async () => {
			if (user.id.length === 0) {
				try {
					const { user } = await getUser().unwrap() || {};
					dispatch(setUser(user));
				} catch (e) {
					dispatch(setLogOut());
				}
			}
		};

		verifyUser();

	}, [
		user.id
	]);

	return (
		<Switch>
			<Route path="/" exact component={LandingPage} />
			<Route path="/viewer" exact component={Viewer} />
			<PrivateRoute isAuthenticated={isAuth} path="/dashboard" component={DashboardPage} />
			<PublicRoute isAuthenticated={isAuth} path="/login" component={LoginPage} />
			<PublicRoute isAuthenticated={isAuth} path="/register" component={RegisterPage} />
		</Switch>
	);
};

export default App;
