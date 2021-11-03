import * as React from "react";
import { ButtonProps, Button } from "antd";

import "./SubmitButton.scss";

type Props = {} & ButtonProps;

export function SubmitButton(props: Props) {
	return (
		<Button {...props} htmlType="submit" className="button-submit">
			{props?.children}
		</Button>
	);
}
