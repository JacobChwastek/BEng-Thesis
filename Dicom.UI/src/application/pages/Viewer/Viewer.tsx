import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DwvComponent, ManagementSider } from "domain/dwv/components";
import { RootState } from "application/store/store";
import { Layout } from "ui/Layout";
import { api } from "infrastructure/persistance/axios";

import "./Viewer.scss";
import { uploadDicom } from "domain/dwv/store/dicomSlice";

type Props = {};


export const Viewer = (props: Props) => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);
	const dicom = useSelector((state: RootState) => state.dicom.dicom);

	const onFileUpload = async (files: FileList) => {

		const form = new FormData();
		const file = files[0];
		form.append(file.name, file, file.name);


		try {
			dispatch(uploadDicom({ fileName: file.name, fileSize: file.size }));
			const result = await api.post("/dicom/upload-dicom", form, { headers: { "Content-Type": "multipart/form-data" } });
		} catch (e) {
			console.log(e);
		} finally {

		}
	};

	return (
		<Layout contentWrapper={false} isAuth={isAuth}>
			<div className="viewer">
				<DwvComponent onFileUpload={onFileUpload} />
				{
					dicom.uploaded && <ManagementSider />
				}
			</div>
		</Layout>
	);
};
