import * as React from "react";
import { Input as AInput, InputProps } from "antd";

import "./Input.scss";

type Props = {
	type: "outline";
	onChange?: (value: string) => void;
	maxLength?: number;
	label?: string;
} & InputProps;

export const Input = ({ type, onChange, maxLength, label, prefix }: Props) => {
	return (
		<AInput
			prefix={prefix}
			placeholder={label}
			maxLength={maxLength}
			type="text"
			className={`input input--${type}`}
			onChange={e => onChange && onChange(e.target.value)}
		/>
	);
};

export const InputPassword = ({ type, onChange, maxLength, label, prefix }: Props) => {
	return (
		<AInput.Password
			prefix={prefix}
			placeholder={label}
			maxLength={maxLength}
			type="password"
			className={`input input--${type}`}
			onChange={e => onChange && onChange(e.target.value)}
		/>
	);
};
