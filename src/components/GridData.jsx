import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { Box, useTheme } from "@mui/material";
import { tokens } from '../theme';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
const GridData = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const gridRef = useRef();

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    return (
        <>
            <Box
                sx={{
                    "& .ag-theme-alpine .ag-root-wrapper, .ag-theme-alpine": {
                        border: 'none'
                    },
                    "& .ag-theme-alpine .ag-header-cell, .ag-header": {
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
                    "& .ag-header-active": {
                        backgroundColor: "#454bbc !important"
                    },
                    "& .ag-icon-menu": {
                        color: 'white !important'
                    }

                }}
            >
                {/* Example using Grid's API */}

                {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                <div className='ag-theme-alpine' style={{ width: '100%', height: '70vh' }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <AgGridReact
                            ref={gridRef} // Ref for accessing Grid's API
                            rowData={props.rowData} // Row Data for Rows
                            columnDefs={props.columnDefs} // Column Defs for Columns
                            defaultColDef={defaultColDef} // Default Column Properties
                            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                            rowSelection='multiple' // Options - allows click selection of rows
                            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                        />
                    </div>
                </div>
            </Box>
        </>
    )
}

export default GridData;