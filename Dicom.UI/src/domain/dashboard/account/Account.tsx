import * as React from "react";
import { Button, Card, Form, Input } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "application/store/store";

import "./Account.scss";

export const Account = () => {
	const user = useSelector((state: RootState) => state.auth.user);

	if (user.id.length == 0)
		return <></>;
	return (
		<div className="account">
			<Card className="account__card" title="Default size card" extra={<a href="#">More</a>}>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ ...user }}
					layout="vertical"
					onFinish={() => {
					}}
					onFinishFailed={() => {
					}}
					autoComplete="off"
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Firstname"
						name="firstName"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Lastname"
						name="lastName"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Phone number"
						name="phoneNumber"
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
			{/*<Card className="account__card" title="Default size card" extra={<a href="#">More</a>}>*/}
			{/*	<p>Card content</p>*/}
			{/*	<p>Card content</p>*/}
			{/*	<p>Card content</p>*/}
			{/*</Card>*/}
			{/*<Card className="account__card" title="Default size card" extra={<a href="#">More</a>}>*/}
			{/*	<p>Card content</p>*/}
			{/*	<p>Card content</p>*/}
			{/*	<p>Card content</p>*/}
			{/*</Card>*/}
			<div className="account__card" />
			<div className="account__card" />
			<div className="account__card" />
		</div>
	);
};
