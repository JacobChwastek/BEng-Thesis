import * as React from "react";
import { Button, Layout as ALayout, Menu } from "antd";
import Logo from "ui/assets/img/logo.png";
import { RotatingLogo } from "ui/Logo/RotatingLogo";

import "./Header.scss";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "application/store/hooks";
import { setLogOut } from "domain/auth/store/authSlice";

type Props = {
	isAuth: boolean;

};

const { Header: AHeader } = ALayout;

export function Header({ isAuth }: Props) {
	const history = useHistory();

	//todo: do wyjebania zła warstwa
	const dispatch = useAppDispatch();

	return (
		<AHeader className="header">
			<RotatingLogo src={Logo} alt="logo" redirectTo="/" />
			<Menu className="header__menu" theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
				<Menu.Item key="1">nav 1</Menu.Item>
				<Menu.Item key="2">nav 2</Menu.Item>
				<Menu.Item key="3">nav 3</Menu.Item>
			</Menu>
			<div className="header__auth">
				{isAuth ? (
					<Button
						onClick={() => {
							dispatch(setLogOut());
							history.push("/");
						}}
					>
						Wyloguj
					</Button>
				) : (
					<>
						<Button onClick={() => history.push("/login")}>Zaloguj</Button> <Button onClick={() => history.push("/register")}>Zarejestruj</Button>{" "}
					</>
				)}
			</div>
		</AHeader>
	);
}
