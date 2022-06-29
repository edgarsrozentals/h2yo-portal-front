import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { StyledTableRow } from '../common/table';
import { TablePagination, Theme } from '@mui/material';

type LocationRowProps = {
    id: number,
    name: string,
    street: string,
    street2: string,
    zip: string,
    city: string,
    country: string,
    devices: any[]
}

export type RowProps = {
    id: number,
    name: string,
    locations: LocationRowProps[]
}

function Row({ row }: { row: RowProps }) {

  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          
          <IconButton
            aria-label="expand row"
            size="small"
            disabled={row.locations.length === 0}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.locations.length}</TableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Locations
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="right">Devices</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.locations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell component="th" scope="row">
                        {location.name}
                      </TableCell>
                      <TableCell>{location.street} {location.street2} {location.zip} {location.city} {location.country}</TableCell>
                      <TableCell align="right">
                        {location.devices.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function ClientCompaniesTable({ data }: { data: RowProps[] }) {
  
  const headRowStyle = (theme: Theme) =>({ color: theme.palette.common.white, padding: theme.spacing(1,2) });
  
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


  return (<>
    <TableContainer component={Paper}>
      <Table 
        sx={{ minWidth: 750 }}
        size="small"
      >
        <TableHead sx={{ backgroundColor: (theme)=>theme.palette.primary.main }}>
          <TableRow>
            <TableCell sx={headRowStyle} />
            <TableCell sx={headRowStyle}>Client</TableCell>
            <TableCell sx={headRowStyle} align="right">Locations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <Row key={row.id} row={row} />
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: (53) * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[15, 30, 50]}
      component="div"
      count={data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </>
  );
}