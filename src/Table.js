import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from "@mui/material/Button";
import UserDetails from "./UserDetails";
import { DataGrid } from "@mui/x-data-grid";
import { CleaningServices } from "@mui/icons-material";

export default function TodosList(props) {
  const { list } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({});

  const [order, setOtder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();

  const handleClickOpen = (user) => {
    setSelected(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { field: "id", headerName: "Todo ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      getQuickFilterText: (params) => {
        return params.value.name;
      }
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 150
    },
    {
      field: "action",
      headerName: "Action",
      width: 110,
      renderCell: (params) => {
        return (
          <Button variant="contained"
            onClick={(e) => {
              handleClickOpen(params.row);
            }}
          >
            View user
          </Button>
        );
      }
    }
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <UserDetails
        userId={selected.userId}
        id={selected.id}
        title={selected.title}
        open={open}
        handleClose={handleClose}
      />
    </div>
    
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
