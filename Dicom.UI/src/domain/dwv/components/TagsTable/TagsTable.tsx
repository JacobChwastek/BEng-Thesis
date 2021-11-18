import React, { useEffect } from "react";

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import Search from '@material-ui/icons/Search';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { useSetState} from 'ahooks'

type Props = {
	data: any,
	classes: any
};


interface State {
	data: any,
	displayData: any[],
	searchfor: string,
	page: number,
	rowsPerPage: number
}
export const TagsTable = ({ data, classes }: Props) => {
	const [state, setState] = useSetState<State>({
		data: null,
		displayData: [],
		searchfor: "",
		page: 0,
		rowsPerPage: 10
	});

	const filterList =(event: any) => {
		const search = event.target.value
		const searchLo = search.toLowerCase();
		const updatedList = data.filter((item: any) => {
			for ( const key in item ) {
				if( item.hasOwnProperty(key) ) {
					var value = item[key];
					if ( typeof value !== "string" ) {
						value = value.toString();
					}
					if ( value.toLowerCase().indexOf(searchLo) !== -1 ) {
						return true;
					}
				}
			}
			return false;
		})
		setState({searchfor: search, displayData: updatedList});
	}

	const handleChangePage = (_: any, page: number) => setState({ page })

	const handleChangeRowsPerPage = (event:  React.ChangeEvent<HTMLInputElement>) => setState({ page: 0, rowsPerPage: parseInt(event.target.value) });

	return (
		<div className={classes.container}>
			<TextField
				id="search"
				type="search"
				value={state.searchfor}
				className={classes.searchField}
				onChange={filterList}
				margin="normal"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					)
				}}
			/>

			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Tag</TableCell>
						<TableCell>Value</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{[...data].slice(state.page * state.rowsPerPage,
						state.page * state.rowsPerPage + state.rowsPerPage).map((item: any) => {
						return (
							<TableRow className={classes.row} key={item.group+item.element}>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.value.toString()}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<TablePagination
				count={[...data].length}
				page={state.page}
				rowsPerPage={state.rowsPerPage}
				component="div"
				backIconButtonProps={{
					"aria-label": 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page',
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
};
