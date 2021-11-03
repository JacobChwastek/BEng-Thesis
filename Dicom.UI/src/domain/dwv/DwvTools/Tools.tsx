// @flow 
import * as React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Menu, Dialog, Button, AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TagsTable } from "domain/dwv/TagsTable/TagsTable";
import { TransitionUp } from "domain/dwv/DwvComponent";

type Props = {
	toolMenuAnchorEl:  Element | ((element: Element) => Element) | null | undefined,
	isDataLoaded: boolean,
	isTagModalVisible: boolean,
	selectedTool: string,
	metaData: any,
	onToolClick: () => void,
	onReset: () => void,
	onTagsClick: () => void,
	onTagsClose: () => void,
	onMenuClose: () => void,
	toolsMenuItems: React.ReactNode,
	classes: any,
};

export const Tools = ({ toolMenuAnchorEl,onToolClick, isDataLoaded, onReset, onTagsClick, isTagModalVisible, onTagsClose, toolsMenuItems, onMenuClose, selectedTool, classes, metaData }: Props) => {

	return (
		<div className="button-row">
			<Button variant="contained" color="primary"

					aria-haspopup="true"
					onClick={onToolClick}
					disabled={!isDataLoaded}
					size="medium"
			>{ selectedTool }
				<ArrowDropDownIcon/></Button>
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
			>Reset</Button>

			<Button variant="contained" color="primary"
					onClick={onTagsClick}
					disabled={!isDataLoaded}
					size="medium">Tags</Button>
			<Dialog
				open={isTagModalVisible}
				onClose={onTagsClose}

				// TransitionComponent={TransitionUp}
				classes={{ paper: classes.tagsDialog }}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton color="inherit" onClick={onTagsClose} aria-label="Close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.flex}>
							DICOM Tags
						</Typography>
					</Toolbar>
				</AppBar>
				<TagsTable data={metaData} classes={classes} />
			</Dialog>
		</div>
	);
};
