import * as React from "react";
import { AlignItems, FlexDirection, JustifyContent } from "utils/types/CSS";
import styled from "styled-components";

type Props = {
	direction?: FlexDirection;
	justify?: JustifyContent;
	align?: AlignItems;
	children?: React.ReactNode;
	className?: string;
};

const CustomSpace = styled.div<Props>`
	display: flex;
	width: 100%;
	${props => `
  		flex-direction: ${props.direction || "column"};
  		align-items: ${props.align || "inherit"};
  		justify-content: ${props.justify || "inherit"};
  	`};
`;

export const Space = (props: Props) => (
	<CustomSpace className="space" {...props}>
		{props?.children}
	</CustomSpace>
);
