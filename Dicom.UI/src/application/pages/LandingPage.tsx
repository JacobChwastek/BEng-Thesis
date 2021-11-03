import { Layout } from "ui/Layout/Layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "application/store/store";
import DwvComponent from 'domain/dwv/DwvComponent'

type Props = {};

export const LandingPage = (props: Props) => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);

	return (
		<Layout isAuth={isAuth}>
			<DwvComponent/>
		</Layout>
	);
};
