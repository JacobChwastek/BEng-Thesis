import * as React from "react";
import { Button, Col, Divider, Input, Layout, Popover, Row, Select, Statistic } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";

import { formatBytes } from "utils/Math";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "application/store/store";
import {
	setGeneratePdf,
	setRestart,
	setSelectedShape,
	setSelectedTool,
	setServerUpload,
	setShowDicomTags,
	undo
} from "domain/dwv/store/dicomSlice";

import "domain/dwv/components/Management/ManagementSider.scss";
import { useRemoveDicomMutation } from "domain/dwv/store/api";

const { Sider } = Layout;
const { Option } = Select;

type Props = {};

export const ManagementSider = () => {
	const {
		dwv: { dataLoaded, tools, selectedTool },
		dicom: { fileName, fileSize, frames, frameNo, sliceNo, slices, serverUploaded, dicomId }
	} = useSelector((state: RootState) => state.dicom);

	const [remove] = useRemoveDicomMutation();

	const dispatch = useDispatch();

	const displayToolOptions = () => Object.entries(tools).map(([t]) => <Option key={t} value={t}>{t}</Option>);

	const displayToolSubOptions = () => {
		const [key, options] = Object.entries(tools).find(([key]) => key === selectedTool) || [];

		if (!_.isEmpty(options) && options !== undefined) {

			if (key === "Draw") {
				return (
					<Select className="management-sider__select" defaultValue={(options as any).options[0]}
							onChange={value => dispatch(setSelectedShape(value))} style={{ width: 120 }}>
						{(options as any).options.map((o: string) => <Option key={o} value={o}>{o}</Option>)}
					</Select>
				);
			}

			if (key === "WindowLevel") {
				<Input />;
			}

			return (
				<Select className="management-sider__select" defaultValue={selectedTool} value={selectedTool}
						onChange={e => dispatch(setSelectedTool(e))} style={{ width: 120 }}>

				</Select>
			);
		}
		return <></>;
	};

	const removeDicom = async () => {
		try {
			await remove({ id: dicomId }).unwrap();
			dispatch(setServerUpload({ isUploaded: false, id: " " }));
			dispatch(setRestart(true));
			window.location.reload();
		} finally {

		}
	};

	return (
		<Sider collapsible className="management-sider">
			<div className="management-sider__content">
				<Divider></Divider>
				<Row gutter={[24, 24]}>
					<Col span={8}>
						<Button className="management-sider__button" onClick={() => dispatch(setShowDicomTags(true))}
								disabled={!dataLoaded}>
							Show tags
						</Button>
					</Col>
					<Col span={16}>
						<Button className="management-sider__button" onClick={() => dispatch(setGeneratePdf(true))}>
							Generate documentation
						</Button>
					</Col>
					<Col span={8}>
						<Button
							className="management-sider__button"
							icon={<DeleteOutlined />}
							onClick={() => removeDicom()}
						>
							Remove
						</Button>
					</Col>
					<Col span={8}>
						<Button
							className="management-sider__button"
							onClick={() => dispatch(setRestart(true))}
						>
							Reset
						</Button>
					</Col>
					<Col span={8} className="management-sider__status">
						<Popover
							content={serverUploaded ? "Pomyślnie zapisano plik" : "Nie powiadło się zapisuwanie pliku"}
							trigger="hover">
							{serverUploaded ? <CheckOutlined style={{ color: "#2a9d8f" }} /> :
								<CloseOutlined style={{ color: "#e76f51" }} />}
						</Popover>

					</Col>
				</Row>
				<Divider>File</Divider>
				<Row gutter={[24, 24]}>
					<Col span={12}>
						<Statistic className="management-sider__statistics" title="File name" value={fileName} />
					</Col>
					<Col span={12}>
						<Statistic className="management-sider__statistics" title="File size"
								   value={formatBytes(fileSize)} />
					</Col>

					<Col span={12}>
						<Statistic className="management-sider__statistics" title="Slices"
								   value={`${sliceNo + 1} / ${slices}`} />
					</Col>
					<Col span={12}>
						<Statistic className="management-sider__statistics" title="Frames"
								   value={`${frameNo + 1} / ${frames}`} />
					</Col>
				</Row>

				<Divider>Tools</Divider>
				<Row gutter={[24, 24]}>
					<Col span={12}>
						<Select className="management-sider__select" defaultValue={selectedTool} value={selectedTool}
								onChange={e => dispatch(setSelectedTool(e))}>
							{displayToolOptions()}
						</Select>
					</Col>
					<Col span={12}>
						{displayToolSubOptions()}
					</Col>
					<Col span={4}>
						<Button onClick={() => dispatch(undo())}>Undo</Button>
					</Col>


				</Row>
			</div>
		</Sider>
	);
};
