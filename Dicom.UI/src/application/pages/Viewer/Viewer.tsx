import * as React from "react";
import { useSelector } from "react-redux";
import { useSetState } from "ahooks";

import DwvComponent from "domain/dwv/DwvComponent";
import { RootState } from "application/store/store";
import { Layout } from "ui/Layout";
import { ManagementSider } from "domain/dwv/Management/ManagementSider";

import "./Viewer.scss";

type Props = {};

interface State {
	file: {
		fileName: string,
		fileSize: number
	};
}

export const Viewer = (props: Props) => {

	//todo refactor
	const [dicom, setDicom] = useSetState<State>({
		file: {
			fileName: "",
			fileSize: 0
		}
	});

	const isAuth = useSelector((state: RootState) => state.auth.isAuth);

	const onFileUpload = (fileName: string, fileSize: number) => {
		setDicom({
			file: {
				fileName,
				fileSize
			}
		});
	};

	return (
		<Layout contentWrapper={false} isAuth={isAuth}>
			<div className="viewer">
				<DwvComponent onFileUpload={onFileUpload} />
				{
					dicom.file.fileName && <ManagementSider dicom={dicom} />
				}
			</div>
		</Layout>
	);
};
