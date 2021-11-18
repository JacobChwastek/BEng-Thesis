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
		uploaded: false
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
		remove: false
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
		setShowDicomTags: (state, { payload }: PayloadAction<boolean>) => {
			state.dwv.showDicomTags = payload;
		},
		setToolMenuAnchorEl: (state, { payload }: PayloadAction<any>) => {
			state.dwv.toolMenuAnchorEl = payload;
		},
		removeDicom:  (state) => {
			// state.dwv = initialState.dwv;
			// state.dicom = initialState.dicom;
			state.actions.remove = true;
		},
		removeDicomCompleted: (state) => {
			state.actions.remove = false;
		},
		uploadDicom: (state, { payload: { fileSize, fileName } }: PayloadAction<IUploadDicomPayload>) => {
			state.dicom = {
				fileName,
				fileSize,
				uploaded: true
			};
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
	removeDicomCompleted,
} = dicomSlice.actions;
