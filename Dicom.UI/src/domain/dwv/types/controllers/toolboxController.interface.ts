import { EventType } from "@testing-library/react";

export interface IMovableTool {
	/**
	 * Handle key down event.
	 *
	 * @param {object} event The key down event.
	 */
	keydown: (e: KeyboardEvent) => void;


	/**
	 * Handle mouse down event.
	 *
	 * @param {object} event The mouse down event.
	 */
	mousedown: (e: MouseEvent) => void;

	/**
	 * Handle mouse move event.
	 *
	 * @param {object} event The mouse move event.
	 */
	mousemove: (e: MouseEvent) => void;

	/**
	 * Handle mouse out event.
	 *
	 * @param {object} event The mouse out event.
	 */
	mouseout: (e: MouseEvent) => void;

	/**
	 * Handle mouse up event.
	 *
	 * @param {object} event The mouse up event.
	 */
	mouseup: (e: MouseEvent) => void;

	/**
	 * Handle touch end event.
	 *
	 * @param {object} event The touch end event.
	 */
	touchend: (e: TouchEvent) => void;

	/**
	 * Handle touch move event.
	 *
	 * @param {object} event The touch move event.
	 */
	touchmove: (e: TouchEvent) => void;

	/**
	 * Handle touch start event.
	 *
	 * @param {object} event The touch start event.
	 */
	touchstart: (e: TouchEvent) => void;
}

export interface IConfigurableTool {
	/**
	 * Activate the tool.
	 *
	 * @param {boolean} flag The flag to activate or not.
	 */
	activate: (flag: boolean) => void;

	/**
	 * Add an event listener on the app.
	 *
	 * @param {string} type The event type.
	 * @param {object} listener The method associated with the provided
	 *   event type.
	 */
	addEventListener: (type: EventType, listener: any) => void;

	/**
	 * Remove an event listener from the app.
	 *
	 * @param {string} type The event type.
	 * @param {object} listener The method associated with the provided
	 *   event type.
	 */
	removeEventListener: (type: EventType, listener: any) => void;

	/**
	 * Initialise the tool.
	 */
	init: () => void;
}

export interface IDrawTool extends IMovableTool, IConfigurableTool {

	/**
	 * Activate the tool.
	 *
	 * @param {boolean} flag The flag to activate or not.
	 */
	activate: (flag: boolean) => void;

	/**
	 * Handle double click event.
	 *
	 * @param {object} event The mouse up event.
	 */
	dblclick: (event: MouseEvent) => void;

	/**
	 * Set the line colour of the drawing.
	 *
	 * @param {string} colour The colour to set
	 */
	setLineColour: (color: string) => void;

	/**
	 * Set the tool options.
	 *
	 * @param {object} options The list of shape names amd classes.
	 */
	setOptions: (options: any) => void;

	/**
	 * Set shape group on properties.
	 *
	 * @param {object} shapeGroup The shape group to set on.
	 * @param {object} layerGroup The origin layer group.
	 */
	setShapeOn: (shapeGroup: any, layerGroup: any) => void;

	/**
	 * Shape factory list
	 *
	 * @type {object}
	 */
	shapeFactoryList: {
		Arrow?: any
		Circle?: any
		Ellipse?: any
		Protractor?: any
		Roi?: any
		Ruler?: any
	}

	/**
	 * Shape name.
	 *
	 * @type {string}
	 */
	shapeName: string | 0;

	/**
	 * Drawing style.
	 *
	 * @type {dwv.gui.Style}
	 */
	style: any;
}


export interface IToolboxController {

	/**
	 * Listen to layer interaction events.
	 *
	 * @param {object} layer The layer to listen to.
	 */
	attachLayer: (layer: any) => void;

	/**
	 * Remove canvas mouse and touch listeners.
	 *
	 * @param {object} layer The layer to stop listening to.
	 */
	detachLayer: (layer: any) => void;


	/**
	 * Get the selected tool.
	 *
	 * @returns {object} The selected tool.
	 */
	getSelectedTool: () => any;

	/**
	 * Get the selected tool event handler.
	 *
	 * @param {string} eventType The event type, for example
	 *   mousedown, touchstart...
	 * @returns {Function} The event handler.
	 */
	getSelectedToolEventHandler: (eventType: EventType) => any;

	/**
	 * Get the tool list.
	 *
	 * @returns {Array} The list of tool objects.
	 */
	getToolList: () => any[];

	/**
	 * Check if a tool is in the tool list.
	 *
	 * @param {string} name The name to check.
	 * @returns {string} The tool list element for the given name.
	 */
	hasTool: (name: string) => string;


	/**
	 * Initialise.
	 */
	init: () => void;

	/**
	 * Run the selected filter.
	 */
	runSelectedFilter: () => void;

	/**
	 * Set the tool line colour.
	 *
	 * @param {string} colour The colour.
	 */
	setLineColour: (color: string) => void;

	/**
	 * Set the tool range.
	 *
	 * @param {object} range The new range of the data.
	 */
	setRange: (range: any) => void;

	/**
	 * Set the selected filter.
	 *
	 * @param {string} name The name of the filter.
	 */
	setSelectedFilter: (name: string) => void;

	/**
	 * Set the selected shape.
	 *
	 * @param {string} name The name of the shape.
	 */
	setSelectedShape: (name: string) => void;
	/**
	 * Set the selected tool.
	 *
	 * @param {string} name The name of the tool.
	 */
	setSelectedTool: (name: string) => void;
}
