import React, { useEffect, useState } from "react";
import { Layout as ALayout, Menu } from "antd";
import { ToolOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import _ from "lodash";

import { Header } from "ui/Header/Header";

import "./Layout.scss";

const { SubMenu } = Menu;
const { Content, Sider } = ALayout;

type Props = {
	isAuth: boolean;
	role?: string;
	contentWrapper?: boolean;
	children?: React.ReactNode;
};

export const Layout = ({ children, isAuth, role, contentWrapper = true }: Props) => {
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

	const history = useHistory();
	const routeMatch = useRouteMatch();

	useEffect(() => {
		const handleOpenSection = () => {
			const { path } = routeMatch || {};
			const tempPath = path;
			setOpenKeys([tempPath.replace("/", "")]);

		};
		handleOpenSection();
	}, [routeMatch.path]);

	const onChange = (openKeys: string[]) => setOpenKeys(openKeys);

	const onSelect = ({ keyPath, selectedKeys }: any) => {
		setSelectedKeys(selectedKeys);
		history.push("/" + _.chain(keyPath).reverse().join("/").value());
	};

	return (
		<ALayout className="layout">
			<Header isAuth={isAuth} />
			<ALayout>
				<Sider width={200} className="layout__sider">
					<Menu
						className="sider_menu"
						mode="inline"
						openKeys={openKeys}
						onOpenChange={onChange}
						onSelect={onSelect}
						selectedKeys={selectedKeys}
						style={{ height: "100%", borderRight: 0 }}
					>
						<SubMenu key="dashboard" icon={<UserOutlined />} title="Dashboard">
							<Menu.Item key="home">Home</Menu.Item>
							<Menu.Item key="account">Configure account</Menu.Item>
						</SubMenu>
						<Menu.Item key="viewer" icon={<ToolOutlined />}>
							Viewer
						</Menu.Item>
					</Menu>
				</Sider>
				<ALayout className="content-container">
					{
						contentWrapper ?
							<Content className="content-container__content">{children}</Content> : <>{children}</>
					}
				</ALayout>
			</ALayout>
		</ALayout>
	);
};
