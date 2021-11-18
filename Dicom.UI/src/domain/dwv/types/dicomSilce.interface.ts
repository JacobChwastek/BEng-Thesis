export interface IDicomState {
	dwv: {
		versions: {
			dwv: string
			react: string
		},
		tools:  {
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
		metaData: any[],
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
		fileSize: number
	},
	actions: {
		remove: boolean
	}
}

export interface IUploadDicomPayload {
	fileName: string,
	fileSize: number
}
