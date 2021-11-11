import * as React from "react";
import DwvComponent from "domain/dwv/DwvComponent";
import { useSelector } from "react-redux";
import { RootState } from "application/store/store";
import { Layout } from "ui/Layout";
import { ManagementSider } from "domain/dwv/Management/ManagementSider";

import "./Viewer.scss";


type Props = {};

export const Viewer = (props: Props) => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);

	return (
		<Layout isAuth={isAuth}>
			<div className="viewer">
				<DwvComponent />
				<ManagementSider />
			</div>
		</Layout>
	);
};
