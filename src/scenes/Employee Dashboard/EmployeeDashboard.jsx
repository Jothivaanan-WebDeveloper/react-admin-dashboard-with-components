import React from 'react';
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
const EmployeeDashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'make', filter: true },
        { field: 'model', filter: true },
        { field: 'price' }
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
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
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
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                    <Box>
                        <Button
                            size='small'
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[300],
                                // fontSize: "14px",
                                fontWeight: "bold",
                                padding: "5px 8px",
                            }}
                        >
                            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                            Download Reports
                        </Button>
                    </Box>
                </Box>

                <Box
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
                    {/* Example using Grid's API */}

                    {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
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
                </Box>

            </Box>
        </>
    )
}

export default EmployeeDashboard;