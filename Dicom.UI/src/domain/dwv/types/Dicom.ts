export interface IDicomState {
	versions: {
		dwv: string
		react: string
	},
	tools: {
		Livewire: {},
		Filter: {},
		Floodfill: {},
		Scroll: {},
		ZoomAndPan: {},
		WindowLevel: {},
		Draw: {
			options: string[]
			type: string,
			events: string[]
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
	hoverClassName: string
}
