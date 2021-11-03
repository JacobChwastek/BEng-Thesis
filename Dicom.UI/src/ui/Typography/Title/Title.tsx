import * as React from "react";

import "./Title.scss";

type Props = {
	children?: React.ReactNode;
	color?: "white" | "black";
};
export const Title = ({ children, color = "white" }: Props) => {
	return <h1 className={`title--${color}`}>{children}</h1>;
};
