import * as React from "react";
import { useState } from "react";
import { Button, Table, TablePaginationConfig } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "application/store/store";
import { ColumnsType } from "antd/es/table";
import { IMetaData, IMetaDataValue } from "domain/dwv/types/dicomSilce.interface";
import { TagDetails } from "domain/dwv/components/Tags/TagDetails";

import "./TagsTable.scss";

type Props = {};

export const TagsTable = (props: Props) => {
	const {
		dwv: { metaData }
	} = useSelector((state: RootState) => state.dicom);
	const [selectedRecord, setRecord] = useState<IMetaData>();


	const displayValue = (tag: IMetaDataValue) => {
		if (tag === "(no value available)")
			return "No value available";

		if (typeof (tag) === "string")
			return <>{tag}</>;

		return <>Complex data structure. Click details</>;
	};

	const columns: ColumnsType<IMetaData> = [
		{
			title: "Name",
			key: "name",
			render: (record: IMetaData) => <>{record.name}</>
		},
		{
			title: "Value",
			key: "value",
			render: (record: IMetaData) => displayValue(record.value)
		},
		{
			title: "Show details",
			key: "address",
			render: (record: IMetaData) => record.value !== "(no value available)" &&
				<Button onClick={() => setRecord(record)}>Show details</Button>
		}
	];

	const paginationConfig: TablePaginationConfig = {
		pageSize: 5,
		total: metaData.length
	};

	return (
		<div className="tags-table">
			{selectedRecord ?
				<>
					<TagDetails record={selectedRecord} />
					<Button onClick={() => setRecord(undefined)}>Return</Button>
				</>
				:
				<Table dataSource={metaData} columns={columns} pagination={paginationConfig} />}

		</div>
	);
};
