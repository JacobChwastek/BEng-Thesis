export interface IDicomState {
	dwv: {
		versions: {
			dwv: string
			react: string
		},
		tools: {
			Opacity: {},
			Livewire: {},
			Filter: {},
			Floodfill: {},
			Scroll: {},
			ZoomAndPan: {},
			WindowLevel: {},
			Draw: {
				options: string[],
				type: string,
				events: string[],
			}
		},
		toolNames: string[],
		selectedTool: string,
		loadProgress: number,
		dataLoaded: boolean,
		metaData: IMetaData[],
		showDicomTags: boolean,
		toolMenuAnchorEl: any,
		dropboxClassName: string,
		borderClassName: string,
		hoverClassName: string,
		shape: string,
	},
	dicom: {
		uploaded: boolean
		fileName: string,
		fileSize: number,
		slices: number,
		frames: number,
		sliceNo: number,
		frameNo: number,
		serverUploaded: boolean,
		dicomId: string
	},
	actions: {
		reset: boolean,
		undo: number;
		restart: boolean;
		generatePDF: boolean;
		loading: boolean
	}
}

export type IMetaDataValue = string | string[] | "(no value available)" | IMetaData[];

export interface IMetaData {
	name: string,
	value: IMetaDataValue,
	group?: string,
	element?: string,
	vr?: string,
	vl?: number,
	merged?: boolean
}

export interface IUploadDicomPayload {
	fileName: string,
	fileSize: number
}
