import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Snackbar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
  Breadcrumbs,
  HomeIcon,
  MuiAlert,
  NavLink,
  makeStyles,
  withStyles,
  useTheme,
  commonService,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  AddBoxIcon,
  SpeedIcon,
} from "../../../common-counter";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
  },
  btnStyle: {
    backgroundColor: "#1DBF73",
    color: "white",
    fontWeight: "400",
    "&:hover": {
      backgroundColor: "#11a962",
    },
  },
  listIcon: { width: 20, paddingRight: theme.spacing(0.5) },

  table: {
    marginTop: "1.5rem",
  },
  rowPadding: {
    padding: "0.125rem 0.25rem 0 0",
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  link: {
    display: "flex",
    textDecoration: "none",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  active: {
    border: "1px solid #1DBF73",
    textTransform: "Capitalize",
    color: "#1DBF73",
    backgroundColor: "#1DBF7333",
  },
  disabled: {
    border: "1px solid #1DBF73",
    textTransform: "Capitalize",
    color: "#BEBDBD",
  },
  borderRemove: {
    borderBottom: "none",
    paddingLeft: "0",
  },
  btnIcon: {
    paddingRight: "5px",
    fontSize: "20px",
  },
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
export default function Transactions() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const theme = useTheme();

  const [transactionList, setTransactionList] = useState([]);

  const [count, setCount] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [errorMsgBody, setErrorMsgBody] = useState("");
  const [successMsgBody, setSuccessMsgBody] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [dataTableIsLoading, setDataTableIsLoading] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleErrorClose = (event) => {
    setError(false);
  };

  const handleSearch = async () => {
    setDataTableIsLoading(true);
    setTransactionList([]);
    const res = await commonService.getTransactionList();
    if (res.code === 200 && res.data.transactions.length === 0) {
      setError(true);
      setErrorMsgBody("No Data Found");
      setDataTableIsLoading(false);
    } else if (res.code === 200) {
      setTransactionList(res && res.data && res.data.transactions);
      setDataTableIsLoading(false);
    } else {
      setError(true);
      setErrorMsgBody(res.messages);
      setDataTableIsLoading(false);
    }
  };

  const StyledTableCell = withStyles((theme) => ({
    root: {
      //   padding: '0.125rem 0.25rem',
    },
    head: {
      backgroundColor: theme.palette.common.white,
      fontSize: "1.125rem",
      letterSpacing: "0.014375rem",
      fontWeight: "500",
      color: "#2B335E",
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const TablePaginationActions = (props) => {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleBackButtonClick = (event) => {
      setTransactionList([]);

      onChangePage(event, page - 1);

      commonService.getTransactionList().then((res) => {
        if (res.code === 200 && res.data.transactions.length === 0) {
          setError(true);
          setErrorMsgBody("No Data Found");
        } else if (res.code === 200) {
          setTransactionList(res && res.data && res.data.transactions);
        } else {
          setError(true);
          setErrorMsgBody(res.messages);
        }
      });
    };

    const handleNextButtonClick = (event) => {
      setTransactionList([]);
      setCount(count + parseInt(20));
      onChangePage(event, page + 1);
      commonService.getTransactionList().then((res) => {
        if (res.code === 200 && res.data.transactions.length === 0) {
          setError(true);
          setErrorMsgBody("No Data Found");
        } else if (res.code === 200) {
          setTransactionList(res && res.data && res.data.transactions);
        } else {
          setError(true);
          setErrorMsgBody(res.messages);
        }
      });
    };

    return (
      <div className={classes1.root}>
        {/* <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton> */}
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
        {/* <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton> */}
      </div>
    );
  };

  const handleChangePage = (event, newPage) => {
    //  console.log("newpage", newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    //  console.log("rowperpage", event);
    setRowsPerPage(parseInt(event.target.value, 15));
    setPage(0);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success">
          {successMsgBody}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error}
        autoHideDuration={1500}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {errorMsgBody}
        </Alert>
      </Snackbar>
      <Breadcrumbs style={{ marginTop: "10px" }} aria-label="breadcrumb">
        <NavLink
          to="/counter-panel/dashboard"
          style={{ color: "#2B335E99" }}
          className={classes.link}
        >
          <HomeIcon className={classes.icon} />
          Home
        </NavLink>
        <NavLink
          to="/counter-panel/transactions"
          style={{ color: "#2B335E99" }}
          className={classes.link}
        >
          <SpeedIcon className={classes.icon} />
          Transactions
        </NavLink>
        <Typography style={{ color: "#2B335E" }} className={classes.link}>
          <AddBoxIcon className={classes.listIcon} /> List
        </Typography>
      </Breadcrumbs>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            textAlign: "left",
            margin: "15px 0",
            color: "#2B335E",
            fontSize: "25px",
          }}
        >
          Transactions List
        </Typography>
      </div>

      {dataTableIsLoading === true ? (
        <Box mt={15} className="text-center">
          {" "}
          <CircularProgress
            size={30}
            className={classes.progress}
            thickness={3}
          />
        </Box>
      ) : (
        <TableContainer component={Paper} className={classes.table}>
          {transactionList && transactionList.length > 0 && (
            <>
              <Table
                aria-labelledby="tableTitle"
                size="small"
                aria-label="simple table"
                //  style={{ width: "max-content" }}
              >
                <TableHead>
                  <TableRow
                    className={classes.tableHeader}
                    style={{ height: "70px" }}
                  >
                    <StyledTableCell>Transaction Id</StyledTableCell>
                    <StyledTableCell>Sender</StyledTableCell>
                    <StyledTableCell>Receiver</StyledTableCell>
                    <StyledTableCell>Transaction Type</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Transaction Status</StyledTableCell>
                    <StyledTableCell>Created At</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {transactionList &&
                    transactionList.length > 0 &&
                    transactionList.map((item) => (
                      <>
                        <StyledTableRow
                          key={item.transaction_id}
                          style={{ cursor: "pointer" }}
                        >
                          <StyledTableCell>
                            {item.transaction_id}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.source
                              ? item.source && item.source.name
                              : "N/A"}
                            <br />
                            {item.source
                              ? item.source && item.source.mobile_no
                              : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.destination
                              ? item.destination && item.destination.name
                              : "N/A"}
                            <br />
                            {item.source
                              ? item.destination && item.destination.mobile_no
                              : "N/A"}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.transaction_type}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.amount + " " + item.currency}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.transaction_status}
                          </StyledTableCell>
                          <StyledTableCell>{item.created_at}</StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                //  showfirstbutton="true"
                //  showlastbutton="true"
                component="div"
                count={transactionList.length}
                pagesize={15}
                rowsPerPageOptions={[10, 20, 50]}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                ActionsComponent={TablePaginationActions}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          )}

          {transactionList && transactionList.length <= 0 && (
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow
                  className={classes.tableHeader}
                  style={{ height: "70px" }}
                >
                  <StyledTableCell>Level</StyledTableCell>
                  <StyledTableCell>Account Type</StyledTableCell>
                  <StyledTableCell>Account Info</StyledTableCell>
                  <StyledTableCell>Created By</StyledTableCell>
                  <StyledTableCell>Created At</StyledTableCell>
                  <StyledTableCell>Updated By</StyledTableCell>
                  <StyledTableCell>Updated At</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <StyledTableRow>
                  <StyledTableCell style={{ backgroundColor: "white" }}>
                    <h6 className="p-4">No data found!</h6>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
    </Container>
  );
}
