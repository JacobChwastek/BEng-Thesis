import { Link, Redirect } from "react-router-dom";
import { Button } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "application/store/store";
import { RotatingLogo } from "ui/Logo/RotatingLogo";
import Logo from "ui/assets/img/logo.png";

import "./LandingPage.scss";

export const LandingPage = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);

	if (isAuth) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="landing-page">
			<header className="landing-page__header">
				<div className="landing-page__left">
					<RotatingLogo src={Logo} alt="landing-page-logo" redirectTo="/" />
				</div>
				<div className="landing-page__middle" />
				<div className="landing-page__right">
					<Link to="/login">
						<Button className="landing-page__button" type="primary">Login</Button>
					</Link>
					<Link to="/register">
						<Button className="landing-page__button" type="primary">Register</Button>
					</Link>
				</div>
			</header>
			<div className="landing-page__content">
			</div>
		</div>
	);
};
