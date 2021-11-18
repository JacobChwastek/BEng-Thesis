import * as React from "react";
import { Button, Col, Divider, Layout, Row, Select, Statistic } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import _ from 'lodash'

import { formatBytes } from "utils/Math";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "application/store/store";
import { removeDicom, setSelectedTool, setShowDicomTags } from "domain/dwv/store/dicomSlice";

import "domain/dwv/components/Management/ManagementSider.scss";

const { Sider } = Layout;
const { Option } = Select;

type Props = {};

export const ManagementSider = () => {
	const {
		dwv: { dataLoaded, tools, selectedTool },
		dicom: { fileName, fileSize }
	} = useSelector((state: RootState) => state.dicom);

	const dispatch = useDispatch();

	const displayToolOptions = () => Object.entries(tools).map(([t]) => <Option key={t} value={t}>{t}</Option>);

	const displayToolSubOptions = () => {
		const [key, options] = Object.entries(tools).find(([key]) => key === selectedTool) || [];

		if (!_.isEmpty(options)) {
			console.log(options);
			return (
				<Select defaultValue={selectedTool} value={selectedTool}
						onChange={e => dispatch(setSelectedTool(e))} style={{ width: 120 }}>

				</Select>
			)
		}
		// console.log(choosenTool);
		return <></>;
	};

	return (
		<Sider width={500} collapsible className="management-sider">
			<div className="management-sider__content">
				<Divider>File</Divider>
				<Row gutter={[24, 24]}>
					<Col span={8}>
						<Statistic title="File name" value={fileName} />
					</Col>
					<Col span={8}>
						<Statistic title="File size" value={formatBytes(fileSize)} />
					</Col>
					<Col className="flex-center" span={8}>
						<Button type="link" icon={<DeleteOutlined />}
								onClick={() => dispatch(removeDicom())}>Remove</Button>
					</Col>
				</Row>
				<Divider>Tags</Divider>
				<Row gutter={[24, 24]}>
					<Col span={12}>
						<Button onClick={() => dispatch(setShowDicomTags(true))} disabled={!dataLoaded}>Show
							tags</Button>
					</Col>
				</Row>

				<Divider>Tools</Divider>
				<Row gutter={[24, 24]}>
					<Col span={8}>
						<Select defaultValue={selectedTool} value={selectedTool}
								onChange={e => dispatch(setSelectedTool(e))} style={{ width: 120 }}>
							{displayToolOptions()}
						</Select>
					</Col>
					<Col span={8}>
						{displayToolSubOptions()}
					</Col>
					<Col span={8}>

					</Col>
				</Row>
			</div>
		</Sider>
	);
};
