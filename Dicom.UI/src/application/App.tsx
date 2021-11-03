import { Switch, Route } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage, Viewer } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "application/store/store";
import PublicRoute from "application/routing/PublicRoute";

type Props = {};
const App = (props: Props) => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);
	return (
		<Switch>
			<Route path="/" exact component={LandingPage} />
			<Route path="/viewer" exact component={Viewer} />
			<PublicRoute isAuthenticated={isAuth} path="/login" component={LoginPage} />
			<PublicRoute isAuthenticated={isAuth} path="/register" component={RegisterPage} />
		</Switch>
	);
};

export default App;
