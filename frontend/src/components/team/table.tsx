import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { style, styled, useTheme } from '@mui/system';
import { Theme, Typography } from '@mui/material';
import { SelectType, UserData } from '../common/types';
import MultiSelectChip from '../common/input/multiSelectChip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export interface RowData {
  id: number;
  name: string;
  locations: string;
  roles: number;
  email: string,
  phone: string
}



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'roles',
    numeric: true,
    disablePadding: false,
    label: 'Roles',
  },
  {
    id: 'locations',
    numeric: true,
    disablePadding: false,
    label: 'Locations',
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RowData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  showLocations: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, numSelected, rowCount, onRequestSort, showLocations } =
    props;
  const createSortHandler =
    (property: keyof RowData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const theme = useTheme();

  return (
    <TableHead>
      <TableRow>
        {headCells.filter(x => {

          if (x.id === 'locations' && !showLocations) {
            return false;
          }

          return true;
        }).map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{ padding: theme.spacing(1,2) }}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ fontWeight: 400 }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}

export interface TeamTableProps {
    data: UserData[]
    locations: SelectType[]
    showLocations: boolean
    roles: SelectType[]
    onSelectLocation: (user: UserData, data: SelectType[]) => Promise<void>
    onSelectRole: (user: UserData, data: SelectType[]) => Promise<void>
    onDeleteMember: (data: UserData) => Promise<void>
}

export default function TeamTable({ data, locations, showLocations, roles, onSelectRole, onSelectLocation, onDeleteMember }: TeamTableProps) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof RowData>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const [memeberToDelete, setMemberToDelete] = React.useState<UserData | null>(null);

  const handleClose = () => {
    setMemberToDelete(null);
  };

  const theme = useTheme();

  const rows = data;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RowData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleConfirmDelete = (data: UserData) => {

    setMemberToDelete(data);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Dialog
        open={memeberToDelete !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete member?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {memeberToDelete?.name} ({memeberToDelete?.email})?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{ 
            if (memeberToDelete) {
              onDeleteMember(memeberToDelete);
              setMemberToDelete(null);
            }
          }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer>
        <Table
          sx={{ minWidth: 750, }}
          aria-labelledby="tableTitle"
          size="small"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            showLocations={showLocations}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
            {/*stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/
              rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      <Typography variant="body1"><strong>{row.name}</strong></Typography>
                      <Typography variant="body2">{row.phone}</Typography>
                      <Typography variant="body2">{row.email}</Typography>
                    </TableCell>
                    <TableCell align="left"><MultiSelectChip
                      label=""
                      selectOptions={roles}
                      value={row.roles ?? []}
                      multiple={false}
                      onSelectOption={(event: any)=>onSelectRole(row, event)}
                    /></TableCell>
                    {showLocations ? <TableCell align="left"><MultiSelectChip
                      label=""
                      selectOptions={locations}
                      value={row.locations ?? []}
                      onSelectOption={(event: any)=>onSelectLocation(row, event)}
                    /></TableCell> : null}
                    <TableCell align="left">
                      <DeleteForeverIcon sx={{ cursor: 'pointer' }} onClick={()=>handleConfirmDelete(row)} color="warning" />
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}