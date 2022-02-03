import * as React from "react";

import "./RegisterForm.scss";
import { Button, Card, Form } from "antd";
import { Space } from "ui/Space/Space";
import { RotatingLogo } from "ui/Logo/RotatingLogo";
import Logo from "ui/assets/img/logo.png";
import { Title } from "ui/Typography/Title/Title";
import { Input, InputPassword } from "ui/Input/Input";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { SubmitButton } from "ui/Button/SubmitButton";
import { useHistory } from "react-router-dom";

type Props = {
	loginPageUrl: string;
};

export const RegisterForm = ({ loginPageUrl }: Props) => {
	const history = useHistory();

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const onRedirectToRegisterClick = () => {
		history.push(loginPageUrl);
	};

	return (
		<Card
			className="login"
			title={
				<Space align="center" direction="column">
					<RotatingLogo redirectTo="/" src={Logo} alt="logo" />
					<Title>Zarejestruj</Title>
				</Space>
			}
		>
			<Form
				name="login"
				className="login__form"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				layout="vertical"
				autoComplete="off"
			>
				<Form.Item className="login__item" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
					<Input prefix={<UserOutlined />} label="Email" type="outline" />
				</Form.Item>

				<Form.Item className="login__item" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
					<InputPassword prefix={<LockOutlined />} label="Hasło" type="outline" />
				</Form.Item>
				<Form.Item
					className="login__item"
					name="confirm_password"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!"
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("The two passwords that you entered do not match!"));
							}
						})
					]}
				>
					<InputPassword prefix={<LockOutlined />} label="Potwierdź hasło" type="outline" />
				</Form.Item>
				<Space direction="column" justify="center">
					<Form.Item className="login__item">
						<SubmitButton onClick={() => {}}>Zarejestruj</SubmitButton>
					</Form.Item>
					<Form.Item className="login__item">
						<Button onClick={onRedirectToRegisterClick} type="link">
							Posiadasz konto? Zaloguj się
						</Button>
					</Form.Item>
				</Space>
			</Form>
		</Card>
	);
};
