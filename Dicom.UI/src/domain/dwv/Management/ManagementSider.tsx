import * as React from "react";
import { Button, Col, Divider, Layout, Row, Select, Statistic } from "antd";
import { formatBytes } from "utils/Math";

import "./ManagementSider.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "application/store/store";
import { setShowDicomTags } from "domain/dwv/store/dicomSlice";

const { Sider } = Layout;
const { Option } = Select;

type Props = {
	dicom: any
};

export const ManagementSider = ({ dicom }: Props) => {
	const { dataLoaded, showDicomTags } = useSelector((state: RootState) => state.dicom);
	const dispatch = useDispatch();

	return (
		<Sider width={500} collapsible className="management-sider">
			<div className="management-sider__content">
				<Divider>File</Divider>
				<Row gutter={[24, 24]}>
					<Col span={12}>
						<Statistic title="File name" value={dicom.file.fileName} />
					</Col>
					<Col span={12}>
						<Statistic title="File size" value={formatBytes(dicom.file.fileSize)} />
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
						<Select defaultValue="lucy" style={{ width: 120 }}>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="disabled" disabled>
								Disabled
							</Option>
							<Option value="Yiminghe">yiminghe</Option>
						</Select>
					</Col>
					<Col span={8}>

					</Col>
					<Col span={8}>

					</Col>
				</Row>
			</div>
		</Sider>
	);
};
