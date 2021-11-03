import * as React from "react";
import { Row } from "antd";
import { LoginForm } from "domain/auth/components/LoginForm/LoginForm";

import "./LoginPage.scss";

type Props = {};

export const LoginPage = (_: Props) => {
	return (
		<div className="login-page">
			<Row className="login-page__content">
				<LoginForm registerPageUrl="/register" />
			</Row>
		</div>
	);
};
