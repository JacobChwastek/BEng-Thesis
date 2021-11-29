import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// @ts-ignore
import dwv from "dwv";

import { IDicomState, IUploadDicomPayload } from "domain/dwv/types/dicomSilce.interface";

// "arrow", "circle", "draw", "drawCommands", "editor", "ellipse", "filter", "floodfill", "freeHand", "livewire", "opacity", "protractor", "rectangle", "roi", "ruler", "scroll", "undo", "windowLevel", "zoomPan"

export const initialState: IDicomState = {
	dicom: {
		fileName: "",
		fileSize: 0,
		uploaded: false,
		slices: 0,
		frameNo: 0,
		frames: 0,
		sliceNo: 0,
		serverUploaded: false,
		dicomId: ""
	},
	dwv: {
		versions: {
			dwv: dwv.getVersion(),
			react: React.version
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
				options: ["Ruler", "Arrow", "Circle", "Ellipse", "Roi", "Protractor"],
				type: "factory",
				events: ["drawcreate", "drawchange", "drawmove", "drawdelete"]
			}
		},
		toolNames: [],
		selectedTool: "Select Tool",
		loadProgress: 0,
		dataLoaded: false,
		metaData: [],
		showDicomTags: false,
		toolMenuAnchorEl: null,
		dropboxClassName: "dropBox",
		borderClassName: "dropBoxBorder",
		hoverClassName: "hover",
		shape: ""
	},
	actions: {
		reset: false,
		undo: 0,
		restart: false,
		generatePDF: false,
		loading: false
	}
};

export const dicomSlice = createSlice({
	name: "dicom",
	initialState,
	reducers: {
		setShape: (state, { payload }: PayloadAction<string>) => {
			state.dwv.shape = payload;
		},
		setLoadProgress: (state, { payload }: PayloadAction<number>) => {
			state.dwv.loadProgress = payload;
		},
		setMetaData: (state, { payload }: PayloadAction<any[]>) => {
			state.dwv.metaData = payload;
		},
		setToolNames: (state, { payload }: PayloadAction<string[]>) => {
			state.dwv.toolNames = payload;
		},
		setDataLoaded: (state, { payload }: PayloadAction<boolean>) => {
			state.dwv.dataLoaded = payload;
		},
		setSelectedTool: (state, { payload }: PayloadAction<string>) => {
			state.dwv.selectedTool = payload;
		},
		setSelectedShape: (state, { payload }: PayloadAction<string>) => {
			state.dwv.shape = payload;
		},
		setShowDicomTags: (state, { payload }: PayloadAction<boolean>) => {
			state.dwv.showDicomTags = payload;
		},
		setToolMenuAnchorEl: (state, { payload }: PayloadAction<any>) => {
			state.dwv.toolMenuAnchorEl = payload;
		},
		removeDicom: (state) => {
			state.actions.restart = true;
		},
		uploadDicom: (state, { payload: { fileSize, fileName } }: PayloadAction<IUploadDicomPayload>) => {
			state.dicom = {
				fileName,
				fileSize,
				uploaded: true,
				slices: 0,
				sliceNo: 0,
				frames: 0,
				frameNo: 0,
				serverUploaded: false,
				dicomId: ""
			};
		},
		undo: (state) => {
			state.actions.undo++;
		},
		setRestartApp: (state, { payload }: PayloadAction<boolean>) => {
			state.actions.restart = payload;
		},
		setActiveSlice: (state, { payload }: PayloadAction<number>) => {
			state.dicom.sliceNo = payload;
		},
		setSlices: (state, { payload }: PayloadAction<number>) => {
			state.dicom.slices = payload;
		},
		setFrames: (state, { payload }: PayloadAction<number>) => {
			state.dicom.frames = payload;
		},
		setActiveFrame: (state, { payload }: PayloadAction<number>) => {
			state.dicom.frameNo = payload;
		},
		setRestart: (state, { payload }: PayloadAction<boolean>) => {
			state.actions.reset = payload;
		},
		setGeneratePdf: (state, { payload }: PayloadAction<boolean>) => {
			state.actions.generatePDF = payload;
		},
		setServerUpload: (state, { payload: { isUploaded, id } }: PayloadAction<{isUploaded: boolean, id: string}>) => {
			state.dicom.serverUploaded = isUploaded;
			state.dicom.dicomId = id
		}
	}
});

export const {
	setLoadProgress,
	setMetaData,
	setToolNames,
	setDataLoaded,
	setSelectedTool,
	setShowDicomTags,
	setToolMenuAnchorEl,
	uploadDicom,
	removeDicom,
	undo,
	setActiveSlice,
	setFrames,
	setActiveFrame,
	setSlices,
	setSelectedShape,
	setRestartApp,
	setRestart,
	setGeneratePdf,
	setServerUpload,
	setShape
} = dicomSlice.actions;
