import * as React from "react";
import { Link } from "react-router-dom";

import "./RotatingLogo.scss";

type Props = {
	src: string;
	alt: string;
	redirectTo: string;
};

export const RotatingLogo = ({ src, alt, redirectTo }: Props) => {
	return (
		<Link className="rotating-logo" to={redirectTo}>
			<img className="rotating-logo__image logo" alt={alt} src={src} />
		</Link>
	);
};
