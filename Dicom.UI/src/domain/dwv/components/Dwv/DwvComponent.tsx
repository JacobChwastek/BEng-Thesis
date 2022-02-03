import React from "react";
import { connect, ConnectedProps } from "react-redux";
// @ts-ignore
import dwv from "dwv";
import { encode } from "upng-js";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import { Tools } from "domain/dwv/components";
import {
	setActiveFrame,
	setActiveSlice,
	setDataLoaded,
	setFrames,
	setGeneratePdf,
	setLoadProgress,
	setMetaData,
	setOffset,
	setRestart,
	setRestartApp,
	setSelectedShape,
	setSelectedTool,
	setShowDicomTags,
	setSlices,
	setToolMenuAnchorEl,
	setToolNames,
	setWindowLevel,
	setZoom
} from "domain/dwv/store/dicomSlice";
import { RootState } from "application/store/store";

import "./DwvComponent.css";
import { IDwvApp } from "domain/dwv/types";
import { arrayBufferToBase64 } from "utils/Image";
import { useUploadDocumentationImagesMutation } from "domain/dwv/store/api";
import { api } from "infrastructure/persistance/axios";
import { debounce } from "lodash"


// get element
dwv.gui.getElement = dwv.gui.base.getElement;

dwv.gui.prompt = function(message: any, def: any) {
	return prompt(message, def);
};

// Image decoders (for web workers)
dwv.image.decoderScripts = {
	"jpeg2000": `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpeg2000.js`,
	"jpeg-lossless": `${process.env.PUBLIC_URL}/assets/dwv/decoders/rii-mango/decode-jpegloss.js`,
	"jpeg-baseline": `${process.env.PUBLIC_URL}/assets/dwv/decoders/pdfjs/decode-jpegbaseline.js`,
	"rle": `${process.env.PUBLIC_URL}/assets/dwv/decoders/dwv/decode-rle.js`
};

const styles: any = (theme: any) => ({
	button: {
		margin: theme.spacing(1)
	},
	appBar: {
		position: "relative"
	},
	title: {
		flex: "0 0 auto"
	},
	tagsDialog: {
		minHeight: "90vh", maxHeight: "90vh",
		minWidth: "90vw", maxWidth: "90vw"
	},
	iconSmall: {
		fontSize: 20
	}
});

const luts = {
	rainbow: {
		blue: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 247, 239, 231, 223, 215, 207, 199, 191, 183, 175, 167, 159, 151, 143, 135, 127, 119, 111, 103, 95, 87, 79, 71, 63, 55, 47, 39, 31, 23, 15, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152, 160, 168, 176, 184, 192, 200, 208, 216, 224, 232, 240, 248, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 253, 251, 249, 247, 245, 243, 241, 239, 237, 235, 233, 231, 229, 227, 225, 223, 221, 219, 217, 215, 213, 211, 209, 207, 205, 203, 201, 199, 197, 195, 193, 192, 189, 186, 183, 180, 177, 174, 171, 168, 165, 162, 159, 156, 153, 150, 147, 144, 141, 138, 135, 132, 129, 126, 123, 120, 117, 114, 111, 108, 105, 102, 99, 96, 93, 90, 87, 84, 81, 78, 75, 72, 69, 66, 63, 60, 57, 54, 51, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 9, 6, 3],
		red: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
	},
	hot_iron: {
		red: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
		green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 255],
		blue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144, 148, 152, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192, 196, 200, 204, 208, 212, 216, 220, 224, 228, 232, 236, 240, 244, 248, 252, 255]
	},
	pet: {
		red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 197, 199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 221, 223, 225, 227, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
		green: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 128, 126, 124, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 63, 61, 59, 57, 55, 53, 51, 49, 47, 45, 43, 41, 39, 37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 255],
		blue: [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 105, 107, 109, 111, 113, 115, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 193, 195, 197, 199, 201, 203, 205, 207, 209, 211, 213, 215, 217, 219, 221, 223, 225, 227, 229, 231, 233, 235, 237, 239, 241, 243, 245, 247, 249, 251, 253, 255, 252, 248, 244, 240, 236, 232, 228, 224, 220, 216, 212, 208, 204, 200, 196, 192, 188, 184, 180, 176, 172, 168, 164, 160, 156, 152, 148, 144, 140, 136, 132, 128, 124, 120, 116, 112, 108, 104, 100, 96, 92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40, 36, 32, 28, 24, 20, 16, 12, 8, 4, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 85, 89, 93, 97, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 170, 174, 178, 182, 186, 190, 194, 198, 202, 206, 210, 214, 218, 222, 226, 230, 234, 238, 242, 246, 250, 255]
	},
	hot_metal_blue: {
		red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 29, 32, 35, 38, 41, 44, 47, 50, 52, 55, 57, 59, 62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 85, 88, 90, 93, 96, 99, 102, 105, 108, 111, 114, 116, 119, 122, 125, 128, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 166, 169, 172, 175, 178, 181, 184, 187, 190, 194, 198, 201, 205, 209, 213, 217, 221, 224, 228, 232, 236, 240, 244, 247, 251, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
		green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 9, 11, 13, 15, 17, 19, 21, 23, 24, 26, 28, 30, 32, 34, 36, 38, 40, 41, 43, 45, 47, 49, 51, 53, 55, 56, 58, 60, 62, 64, 66, 68, 70, 72, 73, 75, 77, 79, 81, 83, 85, 87, 88, 90, 92, 94, 96, 98, 100, 102, 104, 105, 107, 109, 111, 113, 115, 117, 119, 120, 122, 124, 126, 128, 130, 132, 134, 136, 137, 139, 141, 143, 145, 147, 149, 151, 152, 154, 156, 158, 160, 162, 164, 166, 168, 169, 171, 173, 175, 177, 179, 181, 183, 184, 186, 188, 190, 192, 194, 196, 198, 200, 201, 203, 205, 207, 209, 211, 213, 215, 216, 218, 220, 222, 224, 226, 228, 229, 231, 233, 235, 237, 239, 240, 242, 244, 246, 248, 250, 251, 253, 255],
		blue: [0, 2, 4, 6, 8, 10, 12, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 117, 119, 121, 123, 125, 127, 129, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153, 155, 157, 159, 161, 163, 165, 167, 169, 171, 173, 175, 177, 179, 181, 183, 184, 186, 188, 190, 192, 194, 196, 198, 200, 197, 194, 191, 188, 185, 182, 179, 176, 174, 171, 168, 165, 162, 159, 156, 153, 150, 144, 138, 132, 126, 121, 115, 109, 103, 97, 91, 85, 79, 74, 68, 62, 56, 50, 47, 44, 41, 38, 35, 32, 29, 26, 24, 21, 18, 15, 12, 9, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15, 18, 21, 24, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 76, 79, 82, 85, 88, 91, 94, 97, 100, 103, 106, 109, 112, 115, 118, 121, 124, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 176, 179, 182, 185, 188, 191, 194, 197, 200, 203, 206, 210, 213, 216, 219, 223, 226, 229, 232, 236, 239, 242, 245, 249, 252, 255]
	},
	pet_20step: {
		red: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
		green: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 208, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
		blue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 176, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 192, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]
	}
}

type Props = ConnectedProps<typeof connector> & {
	onFileUpload: (files: FileList) => void;
	classes?: any;
	uploadDocumentationImage: any,
}

type State = {
	dwvApp: IDwvApp | null
}

class DwvComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			dwvApp: null
		};
	}

	render() {
		const {
			dicom: {
				dwv: {
					toolNames,
					loadProgress,
					showDicomTags,
					selectedTool,
					selectedFilter,
					dataLoaded,
					metaData,
					toolMenuAnchorEl,
					selectedWindowLevelMap
				}
			}
		} = this.props;

		if (toolNames === undefined)
			return <></>;

		const toolsMenuItems = toolNames.map((tool: string) =>
			<MenuItem onClick={this.handleMenuItemClick.bind(this, tool)} key={tool} value={tool}>{tool}</MenuItem>
		);

		return (
			<div id="dwv" className="dwv">
				<LinearProgress variant="determinate" value={loadProgress} />
				<Tools
					toolMenuAnchorEl={toolMenuAnchorEl}
					isDataLoaded={dataLoaded}
					selectedTool={selectedTool}
					onToolClick={this.handleMenuButtonClick}
					onReset={this.onReset}
					onMenuClose={this.handleMenuClose}
					toolsMenuItems={toolsMenuItems}
				/>
				<div className="layerContainer">
					{dataLoaded ? <div className="drawDiv"></div> : <div className="dropBox"></div>}
				</div>
			</div>
		);
	}


	resetLayer = () => {
		const layerController = this.state.dwvApp?.getLayerController();
		const viewController = layerController?.getActiveViewLayer().getViewController();

		viewController.setCurrentFrame(0);
		viewController.setCurrentSlice(0);
	};


	generatePdf = async () => {
		const { frames, slices, frameNo, sliceNo, dicomId } = this.props.dicom.dicom;
		const layerController = this.state.dwvApp?.getLayerController();
		const viewController = layerController?.getActiveViewLayer().getViewController();

		console.log("Generate");

		viewController.setCurrentFrame(0);
		viewController.setCurrentSlice(0);

		const hasFrames = (this.state.dwvApp?.getImage().getNumberOfFrames() !== 1);
		let documentationId: null | string = null;

		for (let i = 0; i < slices; i++) {
			const hasSlices = (this.state.dwvApp?.getImage().getGeometry().getSize().getNumberOfSlices() !== 1);
			const imageData = this.state.dwvApp?.getLayerController().getActiveViewLayer().getImageData();
			const img = encode([imageData.data.buffer], imageData.width, imageData.height, 0);

			const stage = this.state.dwvApp?.getLayerController().getActiveDrawLayer().getKonvaStage();
			const dataURL = stage.toDataURL();

			const result: any = await this.props.uploadDocumentationImage({
				documentationId,
				dicomId,
				drawLayerImgBase64: dataURL,
				viewLayerImageBase64: "data:image/png;base64," + arrayBufferToBase64(img)
			}).unwrap();

			documentationId = result?.id;

			if (i == slices - 1) {
				try {
					const { data } = await api.get<any>(`documentation?id=${dicomId}`, {
						responseType: "blob"
					});

					const url = window.URL.createObjectURL(data);
					const a = document.createElement("a");
					document.body.appendChild(a);
					a.href = url;
					a.target = "_blank";
					a.click();
				} catch (e) {

				} finally {
					this.props.setGeneratePdf(false);
				}
			}

			if (hasSlices) {
				viewController.incrementSliceNb();
			}
		}

	};

	componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
		/**
		 * Change tool
		 */
		if (prevProps.dicom.dwv.selectedTool !== this.props.dicom.dwv.selectedTool) {
			const { selectedTool } = this.props.dicom.dwv;
			this.state.dwvApp?.setTool(selectedTool);
			if (selectedTool === "Draw") {
				this.onChangeShape(this.props.dicom.dwv.tools.Draw.options[0]);
			}
		}

		/**
		 * Change filter
		 */

		// if (prevProps.dicom.dwv.selectedFilter !== this.props.dicom.dwv.selectedFilter) {
		// 	const { selectedFilter } = this.props.dicom.dwv;
		//
		// 	console.log(this.state.dwvApp?.getLayerController().getActiveViewLayer());
		// 	console.log(this.state.dwvApp?.getLayerController().getActiveViewLayer().getOpacity());
		// }

		/**
		 * Window level map
		 */

		if (prevProps.dicom.dwv.selectedWindowLevelMap !== this.props.dicom.dwv.selectedWindowLevelMap && this.props.dicom.dwv.selectedWindowLevelMap !== "" ) {
			const layerController = this.state.dwvApp?.getLayerController();
			const viewController = layerController?.getActiveViewLayer().getViewController();
			console.log(viewController.getColourMap());

			const colorMap = this.props.dicom.dwv.selectedWindowLevelMap;

			const value = Object.entries(luts).find(([key]) => key === colorMap);
			console.log(value);
			if(value && value.length === 2) {
				viewController.setColourMap(value[1]);
			}
		}

		/**
		 * Reset
		 */
		if (prevProps.dicom.actions.reset !== this.props.dicom.actions.reset && this.props.dicom.actions.reset) {
			this.state.dwvApp?.resetLayout();
			this.state.dwvApp?.resetZoom();
			this.state.dwvApp?.resetDisplay();
			this.state.dwvApp?.deleteDraws();
			this.resetLayer();
			this.props.setRestart(false);
		}

		/**
		 * Generate pdf
		 */
		if (prevProps.dicom.actions.generatePDF !== this.props.dicom.actions.generatePDF && this.props.dicom.actions.generatePDF) {
			this.generatePdf();
		}

		/**
		 * Undo
		 */
		if (prevProps.dicom.actions.undo !== this.props.dicom.actions.undo) {
			this.state.dwvApp?.undo();
		}

		/**
		 * On selectedToolOptionChange
		 */
		if (prevProps.dicom.dwv.shape !== "" && prevProps.dicom.dwv.shape !== this.props.dicom.dwv.shape) {
			this.state.dwvApp?.getToolboxController().setSelectedShape(this.props.dicom.dwv.shape);
			console.log(this.state.dwvApp?.getToolboxController().getToolList());
			console.log(this.state.dwvApp?.getToolboxController().getSelectedTool());
		}
	}

	initApp() {

		console.log(dwv.tool.Filter);
		const app = new dwv.App();

		// initialise app
		app.init({
			"containerDivId": "dwv",
			"tools": this.props.dicom.dwv.tools
		});

		// load events
		let nLoadItem: number | null = null;
		let nReceivedError: number | null = null;
		let nReceivedAbort: number | null = null;
		app.addEventListener("loadstart", () => {
			// reset flags
			nLoadItem = 0;
			nReceivedError = 0;
			nReceivedAbort = 0;
			// hide drop box
			this.showDropbox(app, false);
		});

		app.addEventListener("loadprogress", (event: any) => {
			this.props.setLoadProgress(event.loaded);
		});

		app.addEventListener("opacitychange", (event: any) => {
			console.log("Opacity");
			console.log(event);
		});

		app.addEventListener("wlcenterchange", (event: any) => {
			const { wc, ww } = event;
			this.props.setWindowLevel({
				center: wc,
				width: ww
			});
		});

		app.addEventListener("wlwidthchange", (event: any) => {
			const { wc, ww } = event;
			this.props.setWindowLevel({
				center: wc,
				width: 	 ww
			});
		});

		app.addEventListener("zoomchange", (event: any) => {
			this.props.setZoom(event.value[0]);
		});

		app.addEventListener("offsetchange", (event: any) => {
			const [x, y] = event.value;
			this.props.setOffset({ x, y });
		});

		app.addEventListener("drawcreate", (event: any) => {
			console.log(event);
		});

		// set active slice
		app.addEventListener("slicechange", (event: any) => {
			this.props.setActiveSlice(event.value[0]);
		});

		// set active framechange
		app.addEventListener("framechange", (event: any) => {
			this.props.setActiveFrame(event.frame);
		});

		app.addEventListener("load", () => {
			// set dicom tags
			this.props.setMetaData(dwv.utils.objectToArray(app.getMetaData()));
			// available tools
			let names = [];
			for (const key in this.props.dicom.dwv.tools) {
				if ((key === "Scroll" && app.canScroll()) ||
					(key === "WindowLevel" && app.canWindowLevel()) ||
					(key !== "Scroll" && key !== "WindowLevel")) {
					names.push(key);
				}
			}
			this.props.setToolNames(names);
			this.onChangeTool(names[0]);
			// set the selected tool
			let selectedTool = "Scroll";

			const image = app.getImage();
			const framesNo = image?.getNumberOfFrames();
			this.props.setFrames(framesNo);
			this.props.setSlices(image.getGeometry().getSize(framesNo).getNumberOfSlices());

			if (app.isMonoSliceData() && framesNo === 1) {
				selectedTool = "ZoomAndPan";
			}


			this.onChangeTool(selectedTool);

			/**
			 * Base scale
			 */

			const scale = app.getBaseScale();
			this.props.setZoom(scale.x);

			/**
			 * Offset
			 */

			const offset = app.getOffset();

			this.props.setOffset(offset);

			/**
			 * Lut
			 */

			console.log(app.getImage());

			/**
			 * Window level
			 */

			const {
				center,
				width
			} = app.getLayerController().getActiveViewLayer().getViewController().getWindowLevel();

			this.props.setWindowLevel({ center, width });

			// set data loaded flag
			this.props.setDataLoaded(true);
		});

		app.addEventListener("loadend", (/*event*/) => {
			console.log(dwv);
			if (nReceivedError) {
				this.props.setLoadProgress(0);
				alert("Received errors during load. Check log for details.");
				// show drop box if nothing has been loaded
				if (!nLoadItem) {
					this.showDropbox(app, true);
				}
			}
			if (nReceivedAbort) {
				this.props.setLoadProgress(0);
				alert("Load was aborted.");
				this.showDropbox(app, true);
			}
		});

		app.addEventListener("loaditem", () => {
			nLoadItem && ++nLoadItem;

		});

		app.addEventListener("error", (event: any) => {
			console.error(event.error);
			nReceivedError && ++nReceivedError;

		});

		app.addEventListener("abort", (/*event*/) => {
			nReceivedAbort && ++nReceivedAbort;
		});

		// handle key events
		app.addEventListener("keydown", (event: any) => {
			app.defaultOnKeydown(event);
		});

		// handle window resize
		window.addEventListener("resize", app.onResize);

		// store
		this.setState({ dwvApp: app });

		// setup drop box
		this.setupDropbox(app);

		// possible load from location
		dwv.utils.loadFromUri(window.location.href, app);
	}

	componentDidMount() {
		this.initApp();
	}

	/**
	 * Handle a change tool event.
	 * @param tool The new tool name.
	 */
	onChangeTool = (tool: string) => {
		if (this.state.dwvApp) {
			this.props.setSelectedTool(tool);
			this.state.dwvApp.setTool(tool);
			if (tool === "Draw") {
				this.onChangeShape(this.props.dicom.dwv.tools.Draw.options[0]);
			}
		}
	};

	/**
	 * Handle a change draw shape event.
	 * @param shape The new shape name.
	 */
	onChangeShape = (shape: any) => {
		if (this.state.dwvApp) {
			this.state.dwvApp.setDrawShape(shape);
			this.props.setSelectedShape(shape);
		}
	};

	/**
	 * Handle a reset event.
	 */
	onReset = () => {
		if (this.state.dwvApp) {
			this.state.dwvApp.resetDisplay();
		}
	};

	/**
	 * Open the DICOM tags dialog.
	 */
	handleTagsDialogOpen = () => {
		this.props.setShowDicomTags(true);
	};

	/**
	 * Close the DICOM tags dialog.
	 */
	handleTagsDialogClose = () => {
		this.props.setShowDicomTags(false);
	};

	/**
	 * Menu button click.
	 */
	handleMenuButtonClick = (event: any) => {
		this.props.setToolMenuAnchorEl(event.currentTarget);
	};

	/**
	 * Menu cloase.
	 */
	handleMenuClose = (event: any) => {
		this.props.setToolMenuAnchorEl(null);
	};

	/**
	 * Menu item click.
	 */
	handleMenuItemClick = (tool: string) => {
		this.props.setToolMenuAnchorEl(null);
		this.onChangeTool(tool);
	};

	// drag and drop [begin] -----------------------------------------------------

	/**
	 * Setup the data load drop box: add event listeners and set initial size.
	 */
	setupDropbox = (app: any) => {
		// start listening to drag events on the layer container
		const layerContainer = app.getElement("layerContainer");
		if (layerContainer) {
			// show drop box
			this.showDropbox(app, true);
			// start listening to drag events on the layer container
			layerContainer.addEventListener("dragover", this.onDragOver);
			layerContainer.addEventListener("dragleave", this.onDragLeave);
			layerContainer.addEventListener("drop", this.onDrop);
		}
	};

	/**
	 * Handle a drag over.
	 * @param event The event to handle.
	 */
	onDragOver = (event: any) => {
		// prevent default handling
		event.stopPropagation();
		event.preventDefault();

		if (!this.state.dwvApp) {
			//todo error handling
			return;
		}
		// update box border
		const box = this.state.dwvApp.getElement(this.props.dicom.dwv.borderClassName);
		if (box && box.className.indexOf(this.props.dicom.dwv.hoverClassName) === -1) {
			box.className += " " + this.props.dicom.dwv.hoverClassName;
		}
	};

	/**
	 * Handle a drag leave.
	 * @param event The event to handle.
	 */
	onDragLeave = (event: any) => {
		// prevent default handling
		event.stopPropagation();
		event.preventDefault();

		if (!this.state.dwvApp) {
			//todo error handling
			return;
		}

		// update box class
		const box = this.state.dwvApp.getElement(this.props.dicom.dwv.borderClassName + " hover");
		if (box && box.className.indexOf(this.props.dicom.dwv.hoverClassName) !== -1) {
			box.className = box.className.replace(" " + this.props.dicom.dwv.hoverClassName, "");
		}
	};

	/**
	 * Show/hide the data load drop box.
	 * @param show True to show the drop box.
	 */
	showDropbox = (app: any, show: boolean) => {
		const box = app.getElement(this.props.dicom.dwv.dropboxClassName);
		if (box) {
			if (show) {
				// reset css class
				box.className = this.props.dicom.dwv.dropboxClassName + " " + this.props.dicom.dwv.borderClassName;
				// check content
				if (box.innerHTML === "") {
					box.innerHTML = "Przeciągnij i upuść dane tutaj";
				}
				// const size = app.getLayerContainerSize();
				const size = 1000;

				// set the initial drop box size
				const dropBoxSize = 2 * size / 3;

				box.setAttribute(
					"style",
					"width:" + dropBoxSize + "px;height:" + dropBoxSize + "px");
			} else {
				// remove border css class
				box.className = this.props.dicom.dwv.dropboxClassName;
				// remove content
				box.innerHTML = "";
				// make not visible
				box.setAttribute(
					"style",
					"visible:false;");
			}
		}
	};

	/**
	 * Handle a drop event.
	 * @param event The event to handle.
	 */
	onDrop = async (event: DragEvent) => {
		// prevent default handling
		event.stopPropagation();
		event.preventDefault();

		if (!this.state.dwvApp) {
			//todo error handling
			return;
		}

		// load files
		if (event.dataTransfer) {
			const { dataTransfer: { files } } = event;
			this.state.dwvApp.loadFiles(files);
			this.props.onFileUpload(files);
		}
	};

	// drag and drop [end] -------------------------------------------------------
}


const mapStateToProps = (state: RootState) => ({ dicom: state.dicom });

const mapDispatchToProps = {
	setLoadProgress,
	setMetaData,
	setToolNames,
	setDataLoaded,
	setSelectedTool,
	setShowDicomTags,
	setToolMenuAnchorEl,
	setActiveSlice,
	setActiveFrame,
	setFrames,
	setSlices,
	setSelectedShape,
	setRestartApp,
	setRestart,
	setGeneratePdf,
	setZoom,
	setOffset,
	setWindowLevel
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const RTK = (props: any) => {
	const [uploadDocumentationImage] = useUploadDocumentationImagesMutation();

	return <DwvComponent uploadDocumentationImage={uploadDocumentationImage}  {...props} />;
};

export default withStyles(styles)(connector(RTK));
