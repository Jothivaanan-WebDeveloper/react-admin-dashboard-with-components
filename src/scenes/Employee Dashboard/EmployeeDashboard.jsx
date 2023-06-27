import React from 'react';
import { Box, Button, Chip, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import './EmployeeDashboard.css';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import GridData from '../../components/GridData';
const EmployeeDashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'body', headerName: 'Project Name', filter: true, flex: 1, suppressResize: true },
        { field: 'id', headerName: 'Saved', filter: true, flex: 1 },
        { field: 'id', headerName: 'Submitted', filter: true, flex: 1 },
        { field: 'id', headerName: 'Approved', filter: true, flex: 1 },
        { field: 'id', headerName: 'Rejected', filter: true, flex: 1 },
        { field: 'id', headerName: 'OT Count', filter: true, flex: 1 }
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    // Example load data from server
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    // Example using Grid's API
    const buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);

    return (
        <>
            <Box m="20px">
                {/* HEADER */}
                <div>
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
                </div>

                <div className='d-flex justify-content-between mb-2'>
                    <div>
                        <form className="form" style={{ backgroundColor: colors.primary[400] }}>
                            <button>
                                <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                                    <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </button>
                            <input className="input" placeholder="Quick search" required="" type="text" />
                            <button className="reset" type="reset">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </form>
                    </div>

                    <div>
                        <span >Total Approvals</span> 
                    </div>
                    <div>
                        <Button className='ed-downloadreports'
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: 'white',
                                // fontSize: "14px",
                                fontWeight: "bold",
                                padding: "5px 8px",
                            }}
                        >
                            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                            Download Reports
                        </Button>
                    </div>
                </div>

                <GridData
                    rowData={rowData}
                    columnDefs={columnDefs}
                />

                {/* <Box
                    sx={{
                        "& .ag-theme-alpine .ag-root-wrapper, .ag-theme-alpine": {
                            border: 'none'
                        },
                        "& .ag-theme-alpine .ag-header-cell": {
                            backgroundColor: colors.blueAccent[700],
                            color: 'white',
                        },
                        "& .ag-theme-alpine .ag-root-wrapper": {
                            background: colors.primary[400]
                        },
                        "& .ag-theme-alpine .ag-row": {
                            color: colors.greenAccent[300],
                            background: colors.primary[400],
                            borderBottomColor: colors.greenAccent[800]
                        },
                    }}
                >
                 
                    <div className='ag-theme-alpine' style={{ width: '100%', height: '70vh' }}>
                        <div style={{ width: '100%', height: '100%' }}>
                            <AgGridReact
                                ref={gridRef} // Ref for accessing Grid's API
                                rowData={rowData} // Row Data for Rows
                                columnDefs={columnDefs} // Column Defs for Columns
                                defaultColDef={defaultColDef} // Default Column Properties
                                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                rowSelection='multiple' // Options - allows click selection of rows
                                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                            />
                        </div>
                    </div>
                </Box> */}

            </Box>
        </>
    )
}

export default EmployeeDashboard;