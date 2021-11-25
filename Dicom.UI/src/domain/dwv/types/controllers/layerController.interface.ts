export type Point3d = { x: number; y: number; z: number };

export type Point2d = { x: number; y: number; };


export interface ILayerController {

	/**
	 * Add a draw layer.
	 *
	 * @returns {object} The created layer.
	 */
	addDrawLayer: () => any;

	/**
	 * Add an event listener to this class.
	 *
	 * @param {string} type The event type.
	 * @param {object} callback The method associated with the provided
	 *   event type, will be called with the fired event.
	 */
	addEventListener: (type: string, callback: any) => void;

	/**
	 * Add scale to the layers. Scale cannot go lower than 0.1.
	 *
	 * @param {object} scaleStep The scale to add.
	 * @param {object} center The scale center Point3D.
	 */
	addScale: (scaleStep: number, center: any) => void;

	/**
	 * Add translation to the layers.
	 *
	 * @param {object} translation The translation as {x,y,z}.
	 */
	addTranslation: (translation: Point3d) => void;

	/**
	 * Add a view layer.
	 *
	 * @returns {object} The created layer.
	 */
	addViewLayer: () => any;

	/**
	 * Display the layer.
	 *
	 * @param {boolean} flag Whether to display the layer or not.
	 */
	display: (flag: boolean) => void;

	/**
	 * Transform a display position to an index.
	 *
	 * @param {dwv.Math.Point2D} point2D The point to convert.
	 * @returns {object} The equivalent index.
	 */
	displayToIndex: (point2d: Point2d) => void;

	/**
	 * Draw the layer.
	 */
	draw: () => void;

	/**
	 * Empty the layer list.
	 */
	empty: () => void;

	/**
	 * Fit the display to the size of the container.
	 * To be called once the image is loaded.
	 */
	fitToContainer: () => void;

	/**
	 * Get the active draw layer.
	 *
	 * @returns {object} The layer.
	 */
	getActiveDrawLayer: () => any;

	/**
	 * Get the active image layer.
	 *
	 * @returns {object} The layer.
	 */
	getActiveViewLayer: () => any;

	/**
	 * Get the added scale: the scale added to the base scale
	 *
	 * @returns {object} The scale as {x,y,z}.
	 */
	getAddedScale: () => Point3d;

	/**
	 * Get the base scale.
	 *
	 * @returns {object} The scale as {x,y,z}.
	 */
	getBaseScale: () => Point3d	;

	/**
	 * Get the fit to container scale.
	 * To be called once the image is loaded.
	 *
	 * @returns {number} The scale.
	 */
	getFitToContainerScale: () => number;

	/**
	 * Get the size available for the layer container div.
	 *
	 * @returns {object} The available width and height as {width,height}.
	 */
	getLayerContainerSize: () => { width: number; height: number; };

	/**
	 * Get the number of layers handled by this class.
	 *
	 * @returns {number} The number of layers.
	 */
	getNumberOfLayers: () => number;

	/**
	 * Get the layer offset.
	 *
	 * @returns {object} The offset as {x,y,z}.
	 */
	getOffset: () => Point3d;

	/**
	 * Get the layer scale.
	 *
	 * @returns {object} The scale as {x,y,z}.
	 */
	getScale: () => Point3d;

	/**
	 * Initialise the layer: set the canvas and context
	 *
	 * @param {object} image The image.
	 * @param {object} metaData The image meta data.
	 * @param {number} dataIndex The data index.
	 */
	initialise: (image: any, metaData: any, dataIndex: number) => void;

	/**
	 * Remove an event listener from this class.
	 *
	 * @param {string} type The event type.
	 * @param {object} callback The method associated with the provided
	 *   event type.
	 */
	removeEventListener: (type: string, callback:any) => void

	/**
	 * Reset the stage to its initial scale and no offset.
	 */
	reset: () => void

	/**
	 * Resize the layer: update the base scale and layer sizes.
	 *
	 * @param {number} newScale The scale as {x,y}.
	 */
	resize: (newScale: Point2d) => void;

	/**
	 * Set the active draw layer.
	 *
	 * @param {number} index The index of the layer to set as active.
	 */
	setActiveDrawLayer: (index: number) => void;

	/**
	 * Set the active view layer.
	 *
	 * @param {number} index The index of the layer to set as active.
	 */
	setActiveViewLayer: (index: number) => void;

	/**
	 * Set the layers' offset.
	 *
	 * @param {object} newOffset The offset as {x,y,z}.
	 * @fires dwv.ctrl.LayerGroup#offsetchange
	 */
	setOffset: (newOffset: Point3d) => void;

	/**
	 * Set the layers' scale.
	 *
	 * @param {object} newScale The scale to apply as {x,y,z}.
	 * @fires dwv.ctrl.LayerGroup#zoomchange
	 */
	setScale: (newScale: Point3d) => void;

	/**
	 * Update layers to the active view position.
	 */
	updatePosition: () => void;
}
