import { Link } from "react-router-dom";
import { RotatingLogo } from "ui/Logo/RotatingLogo";
import Logo from "ui/assets/img/logo.png";

import "./LandingPage.scss";
import { Button } from "antd";

export const LandingPage = () => {
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
