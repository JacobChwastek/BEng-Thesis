import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// @ts-ignore
import dwv from "dwv";

import { IDicomState } from "domain/dwv/types/Dicom";

export const initialState: IDicomState = {
	versions: {
		dwv: dwv.getVersion(),
		react: React.version
	},
	tools: {
		Livewire: {},
		Filter: {},
		Floodfill: {},
		Scroll: {},
		ZoomAndPan: {},
		WindowLevel: {},
		Draw: {
			options: ["Ruler"],
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
	hoverClassName: "hover"
};

export const dicomSlice = createSlice({
	name: "dicom",
	initialState,
	reducers: {
		setLoadProgress: (state, { payload }: PayloadAction<number>) => {
			state.loadProgress = payload;
		},
		setMetaData: (state, { payload }: PayloadAction<any[]>) => {
			state.metaData = payload;
		},
		setToolNames: (state, { payload }: PayloadAction<string[]>) => {
			state.toolNames = payload;
		},
		setDataLoaded: (state, { payload }: PayloadAction<boolean>) => {
			state.dataLoaded = payload;
		},
		setSelectedTool: (state, { payload }: PayloadAction<string>) => {
			state.selectedTool = payload;
		},
		setShowDicomTags: (state, { payload }: PayloadAction<boolean>) => {
			state.showDicomTags = payload;
		},
		setToolMenuAnchorEl: (state, { payload }: PayloadAction<any>) => {
			state.toolMenuAnchorEl = payload;
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
	setToolMenuAnchorEl
} = dicomSlice.actions;
