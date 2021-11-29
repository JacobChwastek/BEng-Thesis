import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { DwvComponent, ManagementSider } from "domain/dwv/components";
import { RootState } from "application/store/store";
import { Layout } from "ui/Layout";
import { api } from "infrastructure/persistance/axios";

import { setServerUpload, uploadDicom } from "domain/dwv/store/dicomSlice";
import { TagsModal } from "domain/dwv/components/Tags";
import { localStore } from "infrastructure/persistance/storage";
import { AxiosResponse } from "axios";

import "./Viewer.scss";

type Props = {};

export const Viewer = (props: Props) => {
	const dispatch = useDispatch();
	const { isAuth, token } = useSelector((state: RootState) => state.auth);
	const dicom = useSelector((state: RootState) => state.dicom.dicom);

	const onFileUpload = async (files: FileList) => {
		const localStorageToken = localStore.getItem("token");
		const form = new FormData();
		const file = files[0];
		form.append(file.name, file, file.name);

		try {
			dispatch(uploadDicom({ fileName: file.name, fileSize: file.size }));
			const { data: { id } } = await api.post<FormData, AxiosResponse<{ id: string }>>(
				"/dicom/upload-dicom",
				form,
				{
					headers: {
						"authorization": `Bearer ${token || localStorageToken}`,
						"Content-Type": "multipart/form-data"
					}
				});
			dispatch(setServerUpload({ isUploaded: true, id }));
		} catch (e) {
			dispatch(setServerUpload({ isUploaded: false, id: "" }));
		} finally {}
	};

	return (
		<Layout contentWrapper={false} isAuth={isAuth}>
			<div className="viewer">
				<DwvComponent onFileUpload={onFileUpload} />
				{
					dicom.uploaded && <ManagementSider />
				}
			</div>
			<TagsModal />
		</Layout>
	);
};
