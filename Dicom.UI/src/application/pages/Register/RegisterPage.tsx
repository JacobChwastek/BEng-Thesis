import * as React from "react";
import { Row } from "antd";
import { RegisterForm } from "domain/auth/components/RegisterForm/RegisterForm";

import "./RegisterPage.scss";

type Props = {};

export const RegisterPage = (_: Props) => {
	return (
		<div className="login-page">
			<Row className="login-page__content">
				<RegisterForm loginPageUrl="/login" />
			</Row>
		</div>
	);
};
