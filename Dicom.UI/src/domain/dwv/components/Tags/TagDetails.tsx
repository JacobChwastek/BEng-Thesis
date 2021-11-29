import { Button, Collapse, Table, Typography } from "antd";
import { IMetaData, IMetaDataValue } from "domain/dwv/types/dicomSilce.interface";
import _ from "lodash";

import "./TagDetails.scss";
import { ColumnsType } from "antd/es/table";
import * as React from "react";

const { Panel } = Collapse;
const { Title } = Typography;

type Props = {
	record: IMetaData
};

export const TagDetails = ({ record }: Props) => {
	const displayValue = (value: IMetaDataValue) => {
		const valueType = typeof (value);

		if (valueType === "string" || valueType ==="number")
			return <p>{value}</p>;


		if (_.isArray(value) && value.length > 0) {

			if (!_.isObject(value[0])) {
				return value.join(" , ");
			}

			const columns: ColumnsType<IMetaData> = [
				{
					title: "Name",
					key: "name",
					dataIndex: 'name'
				},
				{
					title: "Value",
					key: "value",
					dataIndex: 'value'
				},
				{
					title: "Group",
					key: "group",
					dataIndex: 'group'
				},
				{
					title: "VL",
					key: "vl",
					dataIndex: 'vl'
				},
				{
					title: "VR",
					key: 'vr',
					dataIndex: 'vr'
				}
			];
			return <Table dataSource={value as any} columns={columns} pagination={{ pageSize: 5}}  />

		}
		return <></>
	};

	const displayOtherParameters = (tag: IMetaData) => {
		const filteredRecord = _.pickBy(tag, (_, key) => key !== "name" && key !== "value");

		return Object.entries(filteredRecord).map(([key, value]: [string, any]) =>
			<Panel header={_.upperFirst(key)} key={key}>
				<p>{_.upperFirst(value)}</p>
			</Panel>
		);
	};

	const displayDetails = (tag: IMetaData) => {
		console.log(tag);
		return <Collapse key={tag.name} defaultActiveKey={["1"]}>
			<Panel header="Tag name" key="1">
				<p>{record.name}</p>
			</Panel>
			<Panel header="Value" key="2">
				{displayValue(record.value)}
			</Panel>
			{displayOtherParameters(tag)}
		</Collapse>;
	};

	return (
		<div className="tag-details">
			{displayDetails(record)}
		</div>
	);
};
