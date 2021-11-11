import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import { useSelector } from "react-redux";

import { Account } from "domain/dashboard";
import { Layout } from "ui/Layout";
import { RootState } from "application/store/store";

import "./DashboardPage.scss";


type Props = {};

export const DashboardPage = (props: Props) => {
	const { pathname } = useLocation();
	const [view, setView] = useState("home");
	const user = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		const viewNameFromPath = _.chain(pathname).split("/").reverse().head().value();
		setView(viewNameFromPath);
	}, [pathname]);

	const displayView = () => {
		switch (view) {
			case "home":
				return <>home</>;
			case "account":
				return <Account />;
			default:
				return <>home</>;
		}
	};

	return (
		<Layout isAuth={true} contentWrapper={false} role={user.role?.name}>
			{displayView()}
		</Layout>
	);
};
