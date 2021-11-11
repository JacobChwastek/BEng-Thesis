import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import { Tools } from "./DwvTools/Tools";

// @ts-ignore
import dwv from "dwv";

import "./DwvComponent.css";
import {
	setDataLoaded,
	setLoadProgress,
	setMetaData,
	setSelectedTool,
	setShowDicomTags,
	setToolMenuAnchorEl,
	setToolNames
} from "domain/dwv/store/dicomSlice";
import { RootState } from "application/store/store";


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

type Props = ConnectedProps<typeof connector> & {
	onFileUpload: (fileName: string, fileSize: number) => void;
	classes?: any;
}
type State = {
	dwvApp: any
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
			classes,
			dicom: {
				versions,
				tools,
				toolNames,
				loadProgress,
				showDicomTags,
				selectedTool,
				dataLoaded,
				metaData,
				toolMenuAnchorEl
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
					isTagModalVisible={showDicomTags}
					selectedTool={selectedTool}
					metaData={metaData}
					onToolClick={this.handleMenuButtonClick}
					onReset={this.onReset}
					onTagsClick={this.handleTagsDialogOpen}
					onTagsClose={this.handleTagsDialogClose}
					onMenuClose={this.handleMenuClose}
					toolsMenuItems={toolsMenuItems}
					classes={classes}
				/>
				<div className="layerContainer">
					{dataLoaded ? <div className="drawDiv"></div> : <div className="dropBox"></div>}
				</div>
			</div>
		);
	}

	componentDidMount() {
		// create app
		const app = new dwv.App();

		// initialise app
		app.init({
			"containerDivId": "dwv",
			"tools": this.props.dicom.tools
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

		app.addEventListener("load", () => {
			// set dicom tags
			this.props.setMetaData(dwv.utils.objectToArray(app.getMetaData()));
			// available tools
			let names = [];
			for (const key in this.props.dicom.tools) {
				if ((key === "Scroll" && app.canScroll()) ||
					(key === "WindowLevel" && app.canWindowLevel()) ||
					(key !== "Scroll" && key !== "WindowLevel")) {
					names.push(key);
				}
			}
			console.log(names);
			this.props.setToolNames(names);
			this.onChangeTool(names[0]);
			// set the selected tool
			let selectedTool = "Scroll";
			if (app.isMonoSliceData() && app.getImage().getNumberOfFrames() === 1) {
				selectedTool = "ZoomAndPan";
			}
			this.onChangeTool(selectedTool);
			// set data loaded flag
			this.props.setDataLoaded(true);
		});

		app.addEventListener("loadend", (/*event*/) => {
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

	/**
	 * Handle a change tool event.
	 * @param tool The new tool name.
	 */
	onChangeTool = (tool: string) => {
		if (this.state.dwvApp) {
			this.props.setSelectedTool(tool);
			this.state.dwvApp.setTool(tool);
			if (tool === "Draw") {
				this.onChangeShape(this.props.dicom.tools.Draw.options[0]);
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
		// update box border
		const box = this.state.dwvApp.getElement(this.props.dicom.borderClassName);
		if (box && box.className.indexOf(this.props.dicom.hoverClassName) === -1) {
			box.className += " " + this.props.dicom.hoverClassName;
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
		// update box class
		const box = this.state.dwvApp.getElement(this.props.dicom.borderClassName + " hover");
		if (box && box.className.indexOf(this.props.dicom.hoverClassName) !== -1) {
			box.className = box.className.replace(" " + this.props.dicom.hoverClassName, "");
		}
	};

	/**
	 * Show/hide the data load drop box.
	 * @param show True to show the drop box.
	 */
	showDropbox = (app: any, show: boolean) => {
		const box = app.getElement(this.props.dicom.dropboxClassName);
		if (box) {
			if (show) {
				// reset css class
				box.className = this.props.dicom.dropboxClassName + " " + this.props.dicom.borderClassName;
				// check content
				if (box.innerHTML === "") {
					box.innerHTML = "Drag and drop data here.";
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
				box.className = this.props.dicom.dropboxClassName;
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
	onDrop = (event: DragEvent) => {
		// prevent default handling
		event.stopPropagation();
		event.preventDefault();
		// load files
		if (event.dataTransfer) {
			const { dataTransfer: { files } } = event;
			const [file] = Array.from(files);

			this.props.onFileUpload(file.name, file.size);
			this.state.dwvApp.loadFiles(files);
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
	setToolMenuAnchorEl
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(DwvComponent));
