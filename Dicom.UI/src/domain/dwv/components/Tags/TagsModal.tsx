import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "application/store/store";
import { setShowDicomTags } from "domain/dwv/store/dicomSlice";
import { TagsTable } from "domain/dwv/components/Tags/TagsTable";

import "./TagsModal.scss"


type Props = {
};

export const TagsModal = (props: Props) => {
	const {
		dwv: { showDicomTags },
	} = useSelector((state: RootState) => state.dicom);

	const dispatch = useDispatch();
	return (
		<Modal
			title="DICOM Metadata"
			className="tags-modal"
			centered
			footer={null}
			visible={showDicomTags}
			onOk={() => dispatch(setShowDicomTags(false))}
			onCancel={() => dispatch(setShowDicomTags(false))}
		>
			<TagsTable/>
		</Modal>
	);
};
