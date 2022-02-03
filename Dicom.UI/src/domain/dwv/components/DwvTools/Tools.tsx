import * as React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Button, Menu } from "@material-ui/core";

type Props = {
	toolMenuAnchorEl: Element | ((element: Element) => Element) | null | undefined,
	isDataLoaded: boolean,
	selectedTool: string,
	onToolClick: (event: any) => void,
	onReset: (event: any) => void,
	onMenuClose: (event: any) => void,
	toolsMenuItems: React.ReactNode,
};

export const Tools = ({
						  toolMenuAnchorEl,
						  onToolClick,
						  isDataLoaded,
						  onReset,
						  toolsMenuItems,
						  onMenuClose,
						  selectedTool
					  }: Props) => {

	return (
		<div className="button-row" style={{ visibility: "hidden" }}>
			<Button variant="contained" color="primary"

					aria-haspopup="true"
					onClick={onToolClick}
					disabled={!isDataLoaded}
					size="medium"
			>{selectedTool}
				<ArrowDropDownIcon /></Button>
			<Menu
				id="simple-menu"
				anchorEl={toolMenuAnchorEl}
				open={Boolean(toolMenuAnchorEl)}
				onClose={onMenuClose}
			>
				{toolsMenuItems}
			</Menu>

			<Button variant="contained" color="primary"
					disabled={!isDataLoaded}
					onClick={onReset}
			>
				Reset
			</Button>
		</div>
	);
};
