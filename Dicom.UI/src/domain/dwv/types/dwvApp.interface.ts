import { ILayerController } from "domain/dwv/types/controllers/layerController.interface";
import { IToolboxController } from "domain/dwv/types/controllers/toolboxController.interface";

type Scale = {
	x: number,
	y: number
}

export interface IDwvApp {
	/**
	 * Abort the current load.
	 */
	abortLoad: () => void,

	/**
	 * Add an event listener to this class.
	 *
	 * @param {string} type The event type.
	 * @param {object} callback The method associated with the provided
	 *   event type, will be called with the fired event.
	 */
	addEventListener: (type: string, callback: any) => void,

	/**
	 * Add a command to the undo stack.
	 *
	 * @param {object} cmd The command to add.
	 * @fires dwv.tool.UndoStack#undoadd
	 */
	addToUndoStack: (cmd: any) => void,

	/**
	 * Can the data be scrolled?
	 *
	 * @returns {boolean} True if the data has a third dimension greater than one.
	 */
	canScroll: () => boolean,

	/**
	 * Can window and level be applied to the data?
	 *
	 * @returns {boolean} True if the data is monochrome.
	 */
	canWindowLevel: () => boolean,

	/**
	 * Key down event handler example.
	 * - CRTL-Z: undo
	 * - CRTL-Y: redo
	 * - CRTL-ARROW_LEFT: next element on fourth dim
	 * - CRTL-ARROW_UP: next element on third dim
	 * - CRTL-ARROW_RIGHT: previous element on fourth dim
	 * - CRTL-ARROW_DOWN: previous element on third dim
	 *
	 * @param {object} event The key down event.
	 * @fires dwv.tool.UndoStack#undo
	 * @fires dwv.tool.UndoStack#redo
	 */
	defaultOnKeydown: (event: KeyboardEvent) => void,

	/**
	 * Delete all Draws from all layers.
	 */
	deleteDraws: () => void,

	/**
	 * Fit the display to the given size. To be called once the image is loaded.
	 */
	fitToContainer: () => void,

	/**
	 * Get the layer scale on top of the base scale.
	 *
	 * @returns {object} The scale as {x,y}.
	 */
	getAddedScale: () => Scale,

	/**
	 * Get the base scale.
	 *
	 * @returns {object} The scale as {x,y}.
	 */
	getBaseScale: () => Scale,

	/**
	 * Get the list of drawing display details.
	 * @todo: correct return object
	 * @returns {object} The list of draw details including id, position...
	 */
	getDrawDisplayDetails: () => any,

	/**
	 * Get a list of drawing store details.
	 * @todo: correct return object
	 * @returns {object} A list of draw details including id, text, quant...
	 */
	getDrawStoreDetails: () => any,

	/**
	 * Get a HTML element associated to the application.
	 *
	 * @param {string} _name The name or id to find.
	 * @todo: correct return object
	 * @returns {object} The found element or null.
	 * @deprecated
	 */
	getElement: (_name: string) => any;

	/**
	 * Get the image.
	 *
	 * @param {number} index The data index.
	 * @todo: correct return object
	 * @returns {Image} The associated image.
	 */
	getImage: (index: number) => any,

	/**
	 * Get the size available for the layer container div.
	 * @todo: correct return object
	 * @returns {object} The available width and height: {width:X; height:Y}.
	 */
	getLayerContainerSize: () => any,

	/**
	 * Get the layer controller.
	 * The controller is available after the first loaded item.
	 * @todo: correct return object
	 * @returns {object} The controller.
	 */
	getLayerController: () => ILayerController,

	/**
	 * Get the meta data.
	 *
	 * @param {number} index The data index.
	 * @todo: correct return object
	 * @returns {object} The list of meta data.
	 */
	getMetaData: (index: number) => any,

	/**
	 * Get the layer offset.
	 * @todo: correct return object
	 * @returns {object} The offset.
	 */
	getOffset: () => any,

	/**
	 * Get the JSON state of the app.
	 * @todo: correct return object
	 * @returns {object} The state of the app as a JSON object.
	 */
	getState: () => any,

	/**
	 * Get the app style.
	 * @todo: correct return object
	 * @returns {object} The app style.
	 */
	getStyle: () => any,

	/**
	 * Get the toolbox controller.
	 * @todo: correct return object
	 * @returns {object} The controller.
	 */
	getToolboxController: () => IToolboxController,

	/**
	 * Initialise the application.
	 *
	 * @param {object} opt The application option with:
	 * - `dataViewConfigs`: data indexed object containing the data view
	 *   configurations in the form of a list of objects containing:
	 *   - divId: the HTML div id
	 *   - orientation: optional 'axial', 'coronal' or 'sagittal' otientation
	 *     string (default undefined keeps the original slice order)
	 * - `binders`: array of layerGroup binders
	 * - `tools`: tool name indexed object containing individual tool
	 *   configurations
	 * - `viewOnFirstLoadItem`: boolean flag to trigger the first data render
	 *   after the first loaded data or not
	 * - `defaultCharacterSet`: the default chraracter set string used for DICOM
	 *   parsing
	 */
	init: (opt: any) => {},

	/**
	 * Init the Window/Level display
	 */
	initWLDisplay: () => void,

	/**
	 * Check the visibility of a given group.
	 *
	 * @param {object} drawDetails Details of the drawing to check.
	 * @returns {boolean} True if the group is visible.
	 */
	isGroupVisible: (drawDetails: any) => boolean,

	/**
	 * Is the data mono-frame?
	 *
	 * @returns {boolean} True if the data only contains one frame.
	 */
	isMonoFrameData: () => boolean,

	/**
	 * Is the data mono-slice?
	 *
	 * @returns {boolean} True if the data only contains one slice.
	 */
	isMonoSliceData: () => boolean,

	/**
	 * Load a list of files. Can be image files or a state file.
	 *
	 * @param {Array} files The list of files to load.
	 * @fires dwv.App#loadstart
	 * @fires dwv.App#loadprogress
	 * @fires dwv.App#loaditem
	 * @fires dwv.App#loadend
	 * @fires dwv.App#error
	 * @fires dwv.App#abort
	 */
	loadFiles: (files: FileList) => void,

	/**
	 * Load a list of ArrayBuffers.
	 *
	 * @param {Array} data The list of ArrayBuffers to load
	 *   in the form of [{name: "", filename: "", data: data}].
	 * @fires dwv.App#loadstart
	 * @fires dwv.App#loadprogress
	 * @fires dwv.App#loaditem
	 * @fires dwv.App#loadend
	 * @fires dwv.App#error
	 * @fires dwv.App#abort
	 */
	loadImageObject: (data: any[]) => void,

	/**
	 * Load a list of URLs. Can be image files or a state file.
	 * @todo: correct return object
	 * @param {Array} urls The list of urls to load.
	 * @param {object} options The options object, can contain:
	 *  - requestHeaders: an array of {name, value} to use as request headers
	 *  - withCredentials: boolean xhr.withCredentials flag to pass to the request
	 *  - batchSize: the size of the request url batch
	 * @fires dwv.App#loadstart
	 * @fires dwv.App#loadprogress
	 * @fires dwv.App#loaditem
	 * @fires dwv.App#loadend
	 * @fires dwv.App#error
	 * @fires dwv.App#abort
	 */
	loadURLs: (urls: any[], options: any) => void,

	/**
	 * Key down callback. Meant to be used in tools.
	 *
	 * @param {object} event The key down event.
	 * @fires dwv.App#keydown
	 */
	onKeydown: (event: KeyboardEvent) => void,

	/**
	 * Handle resize: fit the display to the window.
	 * To be called once the image is loaded.
	 * Can be connected to a window 'resize' event.
	 *
	 * @param {object} _event The change event.
	 * @private
	 */
	onResize: (_event: any) => void,

	/**
	 * Redo the last action
	 *
	 * @fires dwv.tool.UndoStack#redo
	 */
	redo: () => void,

	/**
	 * Remove an event listener from this class.
	 *
	 * @param {string} type The event type.
	 * @param {object} callback The method associated with the provided
	 *   event type.
	 */
	removeEventListener: (type: string, callback: any) => void,


	/**
	 * Render the current data.
	 *
	 * @param {number} dataIndex The data index to render.
	 */
	render: (dataIndex: number) => void,

	/**
	 * Reset the application.
	 */
	reset: () => void,

	/**
	 * Reset the display
	 */
	resetDisplay: () => void,

	/**
	 * Reset the layout of the application.
	 */
	resetLayout: () => void,

	/**
	 * Reset the app zoom.s
	 */
	resetZoom: () => void,

	/**
	 * Run the selected image filter.
	 */
	runImageFilter: () => void,

	/**
	 * Set the colour map.
	 *
	 * @param {string} colourMap The colour map name.
	 */
	setColourMap: (colourMap: string) => void,

	/**
	 * Set the draw line colour.
	 *
	 * @param {string} colour The line colour.
	 */
	setDrawLineColour: (color: string) => void,

	/**
	 * Set the draw shape.
	 *
	 * @param {string} shape The draw shape.
	 */
	setDrawShape: (shape: string) => void,

	/**
	 * Set the drawings on the current stage.
	 *
	 * @param {Array} drawings An array of drawings.
	 * @param {Array} drawingsDetails An array of drawings details.
	 */
	setDrawings: (drawings: any[], drawingsDetails: any[]) => void,

	/**
	 * Set the filter min/max.
	 *
	 * @param {object} range The new range of the data: {min:a, max:b}.
	 */
	setFilterMinMax: (range: any) => void,

	/**
	 * Set the image.
	 *
	 * @param {number} index The data index.
	 * @param {Image} img The associated image.
	 */
	setImage: (index: number, img: any) => void,

	/**
	 * Set the image filter
	 *
	 * @param {string} filter The image filter.
	 */
	setImageFilter: (filter: string) => void,

	/**
	 * Set the image layer opacity.
	 *
	 * @param {number} alpha The opacity ([0:1] range).
	 */
	setOpacity: (alpha: number) => void,

	/**
	 * Set the tool
	 *
	 * @param {string} tool The tool.
	 */
	setTool: (tool: string) => void,

	/**
	 * Set the window/level preset.
	 *
	 * @param {object} preset The window/level preset.
	 */
	setWindowLevelPreset: (preset: any) => void,

	/**
	 * Toggle group visibility.
	 *
	 * @param {object} drawDetails Details of the drawing to update.
	 */
	toogleGroupVisibility: (drawDetails: any) => void,

	/**
	 * Apply a translation to the layers.
	 *
	 * @param {number} tx The translation along X.
	 * @param {number} ty The translation along Y.
	 */
	translate: (tx: number, ty: number) => void,

	/**
	 * Undo the last action
	 *
	 * @fires dwv.tool.UndoStack#undo
	 */
	undo: () => void,

	/**
	 * Update a drawing from its details.
	 *
	 * @param {object} drawDetails Details of the drawing to update.
	 */
	updateDraw: (drawDetails: any) => void,

	/**
	 * Zoom to the layers.
	 *
	 * @param {number} step The step to add to the current zoom.
	 * @param {number} cx The zoom center X coordinate.
	 * @param {number} cy The zoom center Y coordinate.
	 */
	zoom: (step: number, cx: number, cy: number) => void,

}
