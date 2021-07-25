import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
import authHeader from "../services/auth-header";
import TransactionService from "../services/wallet.service";
import axios from "axios";
import Cookies from "js-cookie";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import hostAPI from "../services/GetHost";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  Box,
  Button,
  Divider,
  Grid,
  OutlinedInput,
  Typography,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

let Base_URL = `${hostAPI.getHost()}`;

const styless = StyleSheet.create({
  page: {
    padding: "15px",
    fontSize: "12px",
    lineHeight: "1.5",
  },
  table: {
    display: "table",
    width: "auto",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    padding: 7,
    borderBottom: "1px solid #ccc",
  },
  tableCol: {
    width: "50%",
  },
  tableCell: {
    marginTop: 5,
    color: "#2d335b",
  },
  tableCell2: {
    marginTop: 5,
    color: "#8e9a9d",
    textAlign: "right",
  },
  transactionStyle: {
    color: "#1DBF73",
    marginTop: 5,
    textAlign: "right",
  },
  amountStyle: {
    color: "#fc2861",
    marginTop: 5,
    textAlign: "right",
  },
  logo: {
    color: "#fc2861",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "800",
  },
  logo2: {
    color: "#2b335e",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "800",
  },
  invoiceTitle: {
    padding: 7,
    fontWeight: "800",
    paddingBottom: "10px",
  },
});

const headCells = [
  // { id: 'color', numeric: false, disablePadding: true, label: 'color' },
  // { id: 'icon', numeric: true, disablePadding: false, label: 'icon' },
  // { id: "title", numeric: true, disablePadding: false, label: "Title" },
  {
    id: "transaction_id",
    numeric: true,
    disablePadding: false,
    label: "Transaction ID",
  },
  {
    id: "sender",
    numeric: true,
    disablePadding: false,
    label: "Transaction With",
  },
  {
    id: "transaction_type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
  { id: "title", numeric: true, disablePadding: false, label: "Remarks" },
  { id: "title", numeric: true, disablePadding: false, label: "Status" },
  {
    id: "created_at",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{ fontWeight: "bold", color: "gray" }}
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Transactions(props) {
  let history = useHistory();

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("created_at");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [userTransactions, setUserTransaction] = useState([]);
  const [errorMsgBody, setErrorMsgBody] = useState("");
  const [open3, setOpen3] = useState(false);
  const [NoData, setNoData] = React.useState(false);

  const [dataTableIsLoading, setDataTableIsLoading] = React.useState(true);

  const [tx_with, setTx_with] = React.useState("");
  const [searchid, setSearchid] = React.useState("");
  const [searchamount, setSearchamount] = React.useState("");
  const [searchtype, setSearchtype] = React.useState("");
  const [searchstatus, setSearchstatus] = React.useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [transType, setTransType] = React.useState([]);
  const [transSatus, setTransSatus] = React.useState([]);

  const [show, setShow] = React.useState(false);

  useEffect(() => {
    handleSearch();

    TransactionService.getTransactionType().then(
      (response) => {
        if (response.data.code === 200) {
          if (response.data.data.transaction_types.length > 0) {
            setTransType(response.data.data.transaction_types);
          }
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      }
    );

    TransactionService.getTransactionStatus().then(
      (response) => {
        if (response.data.code === 200) {
          if (response.data.data.transaction_statuses.length > 0) {
            setTransSatus(response.data.data.transaction_statuses);
          }
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      }
    );
  }, [page]);

  const handleFilter = () => {
    setShow(!show);
  };

  const handleSearch = async () => {
    setDataTableIsLoading(true);
    TransactionService.getTransactions(
      searchid,
      tx_with,
      searchamount,
      searchtype,
      searchstatus,
      fromDate,
      toDate,
      page + 1
    ).then(
      (response) => {
        if (response.data.code === 200) {
          if (response.data.data !== null) {
            setDataTableIsLoading(false);
            setTotalRows(
              response &&
                response.data &&
                response.data.data_additional &&
                response.data.data_additional.total
            );
            setUserTransaction(
              response &&
                response.data &&
                response.data.data &&
                response.data.data.transactions
            );
          } else if (response.data.data === null) {
            document.getElementById("noTrans").style.display = "none";
            setNoData(true);
          }
        } else {
          setDataTableIsLoading(false);
          setOpen3(true);
          setErrorMsgBody(response && response.data && response.data.messages);
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        } else if (
          userTransactions === error.response ||
          error.response.data ||
          error.response.data.message ||
          error.message ||
          error.toString()
        ) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      }
    );
  };

  const clearFormInput = () => {
    setSearchid("");
    setSearchtype("");
    setSearchamount("");
    setSearchstatus("");
    setTx_with("");
    setFromDate("");
    setToDate("");

    handleSearch();
  };

  const changeFromDate = (date) => {
    let formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    setFromDate(formattedDate);
  };

  const changeToDate = (date) => {
    let formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    setToDate(formattedDate);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userTransactions.map((n) => n.transaction_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userTrans, setUserTrans] = useState("");

  const handleSubmitModel = (event, transaction_id) => {
    event.preventDefault();
    setOpen(true);

    axios
      .get(
        `${Base_URL}api/v1/private/user/transaction/invoice?invoice_id=${transaction_id}&lang=${localStorage.getItem(
          "MnewLocale"
        )}`,
        { headers: authHeader() }
      )
      .then(
        (response) => {
          if (response.data.data !== null) {
            setUserTrans(response.data.data);
          }
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            Cookies.remove("Mtoken");
            localStorage.clear();
            history.push("/login");
            window.location.reload();
          }
        },
        [userTrans]
      );
  };

  const downloadInvoice = (event, transaction_id) => {
    event.preventDefault();
    setOpen1(true);

    axios
      .get(
        `${Base_URL}api/v1/private/user/transaction/invoice?invoice_id=${transaction_id}&lang=${localStorage.getItem(
          "MnewLocale"
        )}`,
        { headers: authHeader() }
      )
      .then(
        (response) => {
          if (response.data.data !== null) {
            setUserTrans(response.data.data);
          }
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            Cookies.remove("Mtoken");
            localStorage.clear();
            history.push("/login");
            window.location.reload();
          }
        },
        [userTrans]
      );
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  return (
    <React.Fragment>
      {/* <Navbar /> */}
      <div id="content">
        <div>
          <Snackbar
            open={open3}
            autoHideDuration={4000}
            onClose={handleClose3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose3} severity="error">
              {errorMsgBody}
            </Alert>
          </Snackbar>
          <div className="row">
            <div className="col-lg-12">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleFilter}
                className="btn btn-sm btn btn-primary"
                style={{
                  borderRadius: "50px",
                  float: "right",
                  marginRight: "1%",
                  marginBottom: "1%",
                }}
              >
                <SearchIcon />
                <FormattedMessage id="Filter" defaultMessage="Filter" />
              </Button>
            </div>
            <div className="col-lg-12">
              {NoData && (
                <div>
                  <p>
                    <FormattedMessage
                      id="No_Transactions"
                      defaultMessage="No Transactions Yet"
                    />
                  </p>
                </div>
              )}

              <div id="noTrans">
                {show ? (
                  <Paper style={{ padding: "20px" }}>
                    <Typography
                      style={{
                        textAlign: "left",
                        marginBottom: "10px",
                        fontSize: "1.125rem",
                        letterSpacing: "0.23px",
                        fontWeight: "500",
                        color: "#2B335E",
                      }}
                    >
                      <FormattedMessage
                        id="Filter_By"
                        defaultMessage="Filter By"
                      />
                      :
                    </Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          style={{ marginBottom: "3%" }}
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            <FormattedMessage id="ID" defaultMessage="ID" />
                          </InputLabel>
                          <OutlinedInput
                            fullWidth
                            label="ID"
                            type="text"
                            inputComponent="input"
                            id="searchid"
                            value={searchid}
                            onChange={(e) => setSearchid(e.target.value)}
                          />
                        </FormControl>

                        <FormControl
                          variant="outlined"
                          fullWidth
                          style={{ marginBottom: "3%" }}
                          size="small"
                          id="merchant"
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            <FormattedMessage
                              id="app_common_amount"
                              defaultMessage="Amount"
                            />
                          </InputLabel>
                          <OutlinedInput
                            labelid="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            label="Merchant"
                            value={searchamount}
                            onChange={(e) => setSearchamount(e.target.value)}
                          ></OutlinedInput>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          style={{ marginBottom: "3%" }}
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            <FormattedMessage
                              id="TransactionWith"
                              defaultMessage="Transaction With"
                            />
                          </InputLabel>
                          <OutlinedInput
                            fullWidth
                            label="From Amount"
                            type="text"
                            inputComponent="input"
                            id="tx_with"
                            value={tx_with}
                            onChange={(e) => setTx_with(e.target.value)}
                          />
                        </FormControl>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          size="medium"
                          id="fromDate"
                          style={{ marginTop: "0" }}
                        >
                          <KeyboardDatePicker
                            inputVariant="outlined"
                            disableFuture
                            invalidDateMessage=""
                            margin="dense"
                            id="fromDate"
                            placeholder="From Date"
                            format="YYYY-MM-DD HH:mm:ss"
                            value={fromDate}
                            onChange={changeFromDate}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          style={{ marginBottom: "3%" }}
                          size="small"
                          label="Reciever is"
                          id="searchtype"
                        >
                          <InputLabel id="transType">Type</InputLabel>
                          <Select
                            labelid="transType"
                            id="demo-simple-select-filled"
                            value={searchtype ? searchtype : " "}
                            label="Reciever"
                            onChange={(e) => setSearchtype(e.target.value)}
                          >
                            <MenuItem value="">
                              <em>
                                <FormattedMessage
                                  id="None"
                                  defaultMessage="None"
                                />
                              </em>
                            </MenuItem>
                            {transType.map((Ttype) => (
                              <MenuItem
                                key={Ttype.identifier}
                                value={Ttype.identifier}
                              >
                                {Ttype.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          size="medium"
                          id="toDate"
                          style={{ marginTop: "0" }}
                        >
                          <KeyboardDatePicker
                            inputVariant="outlined"
                            disableFuture
                            invalidDateMessage=""
                            margin="dense"
                            id="toDate"
                            placeholder="To Date"
                            format="YYYY-MM-DD HH:mm:ss"
                            value={toDate}
                            onChange={changeToDate}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          fullWidth
                          size="small"
                          id="searchstatus"
                        >
                          <InputLabel id="demo-simple-select-filled-label">
                            <FormattedMessage
                              id="status"
                              defaultMessage="Status"
                            />
                          </InputLabel>
                          <Select
                            labelid="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={searchstatus ? searchstatus : " "}
                            onChange={(e) => setSearchstatus(e.target.value)}
                            label="Status"
                          >
                            <MenuItem value="">
                              <em>
                                <FormattedMessage
                                  id="None"
                                  defaultMessage="None"
                                />
                              </em>
                            </MenuItem>
                            {transSatus.map((Tstatus) => (
                              <MenuItem
                                key={Tstatus.identifier}
                                value={Tstatus.identifier}
                              >
                                {Tstatus.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Divider style={{ margin: "10px 0" }} />
                    <Grid
                      item
                      container
                      xl={12}
                      justify="flex-end"
                      alignItems="flex-end"
                    >
                      <Box mr={5}>
                        <Button
                          variant="contained"
                          className="btn btn-sm"
                          style={{ borderRadius: "50px" }}
                          onClick={clearFormInput}
                        >
                          <ClearIcon />{" "}
                          <FormattedMessage id="Clear" defaultMessage="Clear" />
                        </Button>
                      </Box>
                      <Box mr={3} mt={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleSearch}
                          className="btn btn-sm btn btn-primary"
                          style={{ borderRadius: "50px" }}
                        >
                          <SearchIcon />
                          <FormattedMessage
                            id="Filter"
                            defaultMessage="Filter"
                          />
                        </Button>
                      </Box>
                    </Grid>
                  </Paper>
                ) : null}

                <Paper>
                  {dataTableIsLoading ? (
                    <Box mt={15} style={{ textAlign: "center" }}>
                      <CircularProgress
                        size={40}
                        style={{ color: "#fc2861" }}
                        thickness={3}
                      />
                    </Box>
                  ) : (
                    <div>
                      <TableContainer>
                        <Table
                          aria-labelledby="tableTitle"
                          size={"medium"}
                          aria-label="enhanced table"
                        >
                          <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={userTransactions.length}
                          />

                          <TableBody>
                            {userTransactions && userTransactions.length <= 0 && (
                              <TableRow>
                                <TableCell
                                  className="p-4"
                                  style={{ color: "gray" }}
                                >
                                  <small
                                    style={{
                                      fontSize: "14px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    No data found!
                                  </small>
                                </TableCell>
                              </TableRow>
                            )}

                            {userTransactions &&
                              userTransactions.length > 0 &&
                              userTransactions.map((row, index) => (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.transaction_id}
                                >
                                  <TableCell align="center">
                                    <small
                                      style={{
                                        color: "#fc2861",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                      }}
                                      onClick={(event) =>
                                        handleSubmitModel(
                                          event,
                                          row.transaction_id
                                        )
                                      }
                                    >
                                      {row.transaction_id}
                                    </small>

                                    <Modal
                                      className="ModalStyle"
                                      aria-labelledby="transition-modal-title"
                                      aria-describedby="transition-modal-description"
                                      open={open}
                                      onClose={handleClose}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500,
                                      }}
                                    >
                                      <Fade in={open}>
                                        <div>
                                          <div
                                            className="modal-dialog modal-dialog-centered transaction-details"
                                            role="document"
                                          >
                                            <div className="modal-content">
                                              <div className="modal-body">
                                                <div className="row no-gutters">
                                                  <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-left py-4">
                                                    <div className="my-auto text-center">
                                                      <div className="text-17 text-white my-3">
                                                        {" "}
                                                        {userTrans.recipient ? (
                                                          <div>
                                                            <ul className="list-unstyled">
                                                              <li className="text-muted">
                                                                <div>
                                                                  {userTrans
                                                                    .recipient
                                                                    .avatar ? (
                                                                    <img
                                                                      src={
                                                                        userTrans
                                                                          .recipient
                                                                          .avatar
                                                                      }
                                                                      alt=""
                                                                      style={{
                                                                        border:
                                                                          "1px solid #ec247c",
                                                                        borderRadius:
                                                                          "50%",
                                                                        width:
                                                                          "100px",
                                                                        height:
                                                                          "100px",
                                                                      }}
                                                                    />
                                                                  ) : null}
                                                                </div>
                                                              </li>
                                                            </ul>

                                                            <h3 className="text-4 text-white font-weight-400 my-3">
                                                              {
                                                                userTrans
                                                                  .recipient
                                                                  .title
                                                              }
                                                            </h3>
                                                            <h3
                                                              className="text-4 text-white font-weight-400 my-3"
                                                              style={{
                                                                textTransform:
                                                                  "capitalize",
                                                              }}
                                                            >
                                                              {
                                                                userTrans
                                                                  .recipient
                                                                  .name
                                                              }
                                                            </h3>
                                                          </div>
                                                        ) : null}
                                                      </div>

                                                      <div className="text-8 font-weight-500 text-white my-4">
                                                        {
                                                          userTrans.transaction_amount
                                                        }
                                                      </div>
                                                      <p className="text-white">
                                                        {userTrans.date}
                                                      </p>
                                                      <p
                                                        className="text-white"
                                                        style={{
                                                          cursor: "pointer",
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        onClick={(e) =>
                                                          downloadInvoice(
                                                            e,
                                                            userTrans.transaction_id
                                                          )
                                                        }
                                                      >
                                                        Download Pdf
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-7">
                                                    <h5 className="text-5 font-weight-400 m-3">
                                                      <FormattedMessage
                                                        id="Transaction_Details"
                                                        defaultMessage="Transaction Details"
                                                      />

                                                      <button
                                                        type="button"
                                                        className="close font-weight-400"
                                                        data-dismiss="modal"
                                                        aria-label="Close"
                                                        onClick={handleClose}
                                                      >
                                                        {" "}
                                                        <span aria-hidden="true">
                                                          &times;
                                                        </span>{" "}
                                                      </button>
                                                    </h5>
                                                    <hr />
                                                    <div className="px-3">
                                                      <ul className="list-unstyled">
                                                        <li className="mb-2">
                                                          <FormattedMessage
                                                            id="Payment_Amount"
                                                            defaultMessage="Payment Amount"
                                                          />{" "}
                                                          <span className="float-right text-3">
                                                            {
                                                              userTrans.transaction_amount
                                                            }
                                                          </span>
                                                        </li>
                                                        <li className="mb-2">
                                                          <FormattedMessage
                                                            id="Fee"
                                                            defaultMessage="Fee"
                                                          />{" "}
                                                          <span className="float-right text-3">
                                                            {
                                                              userTrans.transaction_fee
                                                            }
                                                          </span>
                                                        </li>
                                                      </ul>
                                                      <hr className="mb-2" />
                                                      <p className="d-flex align-items-center font-weight-500 mb-4">
                                                        <FormattedMessage
                                                          id="Total_Amount"
                                                          defaultMessage="Total Amount"
                                                        />{" "}
                                                        <span className="text-3 ml-auto">
                                                          {
                                                            userTrans.total_deduction
                                                          }
                                                        </span>
                                                      </p>
                                                      <ul className="list-unstyled">
                                                        <li className="font-weight-500">
                                                          <FormattedMessage
                                                            id="TransactionID"
                                                            defaultMessage="Transaction ID"
                                                          />
                                                          :
                                                        </li>
                                                        <li className="text-muted">
                                                          {
                                                            userTrans.transaction_id
                                                          }
                                                        </li>
                                                      </ul>
                                                      <ul className="list-unstyled">
                                                        <li className="font-weight-500">
                                                          <FormattedMessage
                                                            id="description"
                                                            defaultMessage="Description"
                                                          />
                                                          :
                                                        </li>
                                                        <li className="text-muted">
                                                          {
                                                            userTrans.nature_of_transaction
                                                          }{" "}
                                                          -{" "}
                                                          {
                                                            userTrans.transaction_type
                                                          }
                                                        </li>
                                                      </ul>
                                                      <ul className="list-unstyled">
                                                        <li className="font-weight-500">
                                                          <FormattedMessage
                                                            id="date"
                                                            defaultMessage="Date"
                                                          />
                                                          :
                                                        </li>
                                                        <li className="text-muted">
                                                          {userTrans.date}
                                                        </li>
                                                      </ul>
                                                      {userTrans.recipient ? (
                                                        <div>
                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                              <FormattedMessage
                                                                id="Recipient_Name"
                                                                defaultMessage="Recipient Name"
                                                              />{" "}
                                                              :
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {userTrans
                                                                .recipient.name
                                                                ? userTrans
                                                                    .recipient
                                                                    .name
                                                                : null}
                                                            </li>
                                                          </ul>

                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                              <FormattedMessage
                                                                id="Mobile_No"
                                                                defaultMessage="Mobile No."
                                                              />{" "}
                                                              :
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {userTrans
                                                                .recipient
                                                                .msisdn
                                                                ? userTrans
                                                                    .recipient
                                                                    .msisdn
                                                                : null}
                                                            </li>
                                                          </ul>
                                                        </div>
                                                      ) : null}

                                                      {userTrans.card ? (
                                                        <div>
                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                              <FormattedMessage
                                                                id="Card_Type"
                                                                defaultMessage="Card Type"
                                                              />{" "}
                                                              :
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {userTrans.card
                                                                .type
                                                                ? userTrans.card
                                                                    .type
                                                                : null}
                                                            </li>
                                                          </ul>

                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                              <FormattedMessage
                                                                id="Card_Type"
                                                                defaultMessage="Card Type"
                                                              />{" "}
                                                              :
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {userTrans.card
                                                                .how_to
                                                                ? userTrans.card
                                                                    .how_to
                                                                : null}
                                                            </li>
                                                          </ul>

                                                          <ul className="list-unstyled">
                                                            <li className="text-muted">
                                                              {" "}
                                                              {userTrans.card
                                                                .thumbnail ? (
                                                                <img
                                                                  width={200}
                                                                  src={
                                                                    userTrans
                                                                      .card
                                                                      .thumbnail
                                                                  }
                                                                  alt=""
                                                                  style={{
                                                                    border:
                                                                      "2px solid #ec247c",
                                                                    borderRadius:
                                                                      "3px",
                                                                  }}
                                                                />
                                                              ) : null}
                                                            </li>
                                                          </ul>
                                                        </div>
                                                      ) : null}

                                                      {/* PDF Model */}
                                                      <Modal
                                                        className="ModalStyle"
                                                        aria-labelledby="transition-modal-title"
                                                        aria-describedby="transition-modal-description"
                                                        open={open1}
                                                        onClose={handleClose1}
                                                        closeAfterTransition
                                                        BackdropComponent={
                                                          Backdrop
                                                        }
                                                        BackdropProps={{
                                                          timeout: 500,
                                                        }}
                                                      >
                                                        <Fade in={open1}>
                                                          <div>
                                                            <div
                                                              className="modal-dialog modal-dialog-centered transaction-details"
                                                              role="document"
                                                            >
                                                              <div className="modal-content">
                                                                <div className="modal-body">
                                                                  <PDFViewer
                                                                    style={{
                                                                      width:
                                                                        "100%",
                                                                      height: 600,
                                                                    }}
                                                                  >
                                                                    <Document>
                                                                      <Page
                                                                        size="A4"
                                                                        style={
                                                                          styless.page
                                                                        }
                                                                      >
                                                                        <View>
                                                                          <Text>
                                                                            <Text
                                                                              style={
                                                                                styless.logo
                                                                              }
                                                                            >
                                                                              Fast
                                                                            </Text>
                                                                            <Text
                                                                              style={
                                                                                styless.logo2
                                                                              }
                                                                            >
                                                                              Pay
                                                                            </Text>
                                                                          </Text>
                                                                        </View>

                                                                        <Text
                                                                          style={
                                                                            styless.invoiceTitle
                                                                          }
                                                                        >
                                                                          INVOICE
                                                                        </Text>

                                                                        <View
                                                                          style={
                                                                            styless.table
                                                                          }
                                                                        >
                                                                          <View
                                                                            style={
                                                                              styless.tableRow
                                                                            }
                                                                          >
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.recipient &&
                                                                                  userTrans
                                                                                    .recipient
                                                                                    .title}
                                                                              </Text>
                                                                            </View>
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell2
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.recipient &&
                                                                                  userTrans
                                                                                    .recipient
                                                                                    .name}
                                                                              </Text>
                                                                            </View>
                                                                          </View>

                                                                          <View
                                                                            style={
                                                                              styless.tableRow
                                                                            }
                                                                          >
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell
                                                                                }
                                                                              >
                                                                                Date:
                                                                              </Text>
                                                                            </View>
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell2
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.date}
                                                                              </Text>
                                                                            </View>
                                                                          </View>

                                                                          <View
                                                                            style={
                                                                              styless.tableRow
                                                                            }
                                                                          >
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell
                                                                                }
                                                                              >
                                                                                Transaction
                                                                                ID:
                                                                              </Text>
                                                                            </View>
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.transactionStyle
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.transaction_id}
                                                                              </Text>
                                                                            </View>
                                                                          </View>

                                                                          <View
                                                                            style={
                                                                              styless.tableRow
                                                                            }
                                                                          >
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell
                                                                                }
                                                                              >
                                                                                Description:
                                                                              </Text>
                                                                            </View>
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.transactionStyle
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.nature_of_transaction}{" "}
                                                                                {
                                                                                  " - "
                                                                                }{" "}
                                                                                {userTrans &&
                                                                                  userTrans.transaction_type}
                                                                              </Text>
                                                                            </View>
                                                                          </View>

                                                                          {userTrans &&
                                                                            userTrans.recipient && (
                                                                              <View
                                                                                style={
                                                                                  styless.tableRow
                                                                                }
                                                                              >
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell
                                                                                    }
                                                                                  >
                                                                                    Recipient
                                                                                    Name:
                                                                                  </Text>
                                                                                </View>
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell2
                                                                                    }
                                                                                  >
                                                                                    {userTrans &&
                                                                                      userTrans.recipient &&
                                                                                      userTrans
                                                                                        .recipient
                                                                                        .name}
                                                                                  </Text>
                                                                                </View>
                                                                              </View>
                                                                            )}
                                                                          {userTrans &&
                                                                            userTrans.recipient && (
                                                                              <View
                                                                                style={
                                                                                  styless.tableRow
                                                                                }
                                                                              >
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell
                                                                                    }
                                                                                  >
                                                                                    Mobile
                                                                                    Number:
                                                                                  </Text>
                                                                                </View>
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell2
                                                                                    }
                                                                                  >
                                                                                    {userTrans &&
                                                                                      userTrans.recipient &&
                                                                                      userTrans
                                                                                        .recipient
                                                                                        .msisdn}
                                                                                  </Text>
                                                                                </View>
                                                                              </View>
                                                                            )}

                                                                          {userTrans &&
                                                                            userTrans.card && (
                                                                              <View
                                                                                style={
                                                                                  styless.tableRow
                                                                                }
                                                                              >
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell
                                                                                    }
                                                                                  >
                                                                                    Card
                                                                                    Type:
                                                                                  </Text>
                                                                                </View>
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell2
                                                                                    }
                                                                                  >
                                                                                    {userTrans &&
                                                                                      userTrans.card &&
                                                                                      userTrans
                                                                                        .card
                                                                                        .type}
                                                                                  </Text>
                                                                                </View>
                                                                              </View>
                                                                            )}

                                                                          {userTrans &&
                                                                            userTrans.card && (
                                                                              <View
                                                                                style={
                                                                                  styless.tableRow
                                                                                }
                                                                              >
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell
                                                                                    }
                                                                                  >
                                                                                    How
                                                                                    to:
                                                                                  </Text>
                                                                                </View>
                                                                                <View
                                                                                  style={
                                                                                    styless.tableCol
                                                                                  }
                                                                                >
                                                                                  <Text
                                                                                    style={
                                                                                      styless.tableCell2
                                                                                    }
                                                                                  >
                                                                                    {userTrans &&
                                                                                      userTrans.card &&
                                                                                      userTrans
                                                                                        .card
                                                                                        .how_to}
                                                                                  </Text>
                                                                                </View>
                                                                              </View>
                                                                            )}

                                                                          <View
                                                                            style={
                                                                              styless.tableRow
                                                                            }
                                                                          >
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell
                                                                                }
                                                                              >
                                                                                Amount:
                                                                              </Text>
                                                                            </View>
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell2
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.transaction_amount}
                                                                              </Text>
                                                                            </View>
                                                                          </View>

                                                                          <View
                                                                            style={
                                                                              styless.tableRow
                                                                            }
                                                                          >
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell
                                                                                }
                                                                              >
                                                                                Fee:
                                                                              </Text>
                                                                            </View>
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell2
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.transaction_fee}
                                                                              </Text>
                                                                            </View>
                                                                          </View>

                                                                          <View
                                                                            style={
                                                                              styless.tableRow
                                                                            }
                                                                          >
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.tableCell
                                                                                }
                                                                              >
                                                                                Total
                                                                                Amount:
                                                                              </Text>
                                                                            </View>
                                                                            <View
                                                                              style={
                                                                                styless.tableCol
                                                                              }
                                                                            >
                                                                              <Text
                                                                                style={
                                                                                  styless.amountStyle
                                                                                }
                                                                              >
                                                                                {userTrans &&
                                                                                  userTrans.total_deduction}
                                                                              </Text>
                                                                            </View>
                                                                          </View>
                                                                        </View>
                                                                      </Page>
                                                                    </Document>
                                                                  </PDFViewer>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </Fade>
                                                      </Modal>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div></div>
                                        </div>
                                      </Fade>
                                    </Modal>
                                  </TableCell>

                                  <TableCell align="center">
                                    <div style={{ display: "flex" }}>
                                      <img
                                        src={row.icon}
                                        alt=""
                                        width={37}
                                        height={40}
                                        style={{ marginRight: "5px" }}
                                      />
                                      <div>
                                        {row.source
                                          ? row.source.name
                                          : row.destination.name}
                                        <br />
                                        {row.source
                                          ? row.source.mobile_no
                                          : row.destination.mobile_no}
                                      </div>
                                    </div>
                                  </TableCell>

                                  <TableCell align="center">
                                    {row.transaction_type}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.amount} {row.currency}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{
                                      color: row.color,
                                      padding: "16px 0",
                                    }}
                                  >
                                    <span className="statusDiv">
                                      {row.title}
                                    </span>
                                  </TableCell>
                                  {row.transaction_status === "Success" ? (
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "#03EBA3",
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">
                                        {row.transaction_status}
                                      </span>
                                    </TableCell>
                                  ) : row.transaction_status === "On Hold" ? (
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "#000",
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">
                                        {row.transaction_status}
                                      </span>
                                    </TableCell>
                                  ) : row.transaction_status === "Pending" ? (
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "#f8d200",
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">
                                        {row.transaction_status}
                                      </span>
                                    </TableCell>
                                  ) : row.transaction_status === "Failed" ? (
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "#FC2861",
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">
                                        {row.transaction_status}
                                      </span>
                                    </TableCell>
                                  ) : row.transaction_status === "Other" ? (
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "gray",
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">
                                        {row.transaction_status}
                                      </span>
                                    </TableCell>
                                  ) : row.transaction_status ===
                                    "Suspicious" ? (
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "#21293C",
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">
                                        {row.transaction_status}
                                      </span>
                                    </TableCell>
                                  ) : row.transaction_status ===
                                    "Processing" ? (
                                    <TableCell
                                      align="center"
                                      style={{
                                        color: "#984caa",
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">
                                        {row.transaction_status}
                                      </span>
                                    </TableCell>
                                  ) : (
                                    <TableCell
                                      align="center"
                                      style={{
                                        padding: "16px 0",
                                      }}
                                    >
                                      <span className="statusDiv">None</span>
                                    </TableCell>
                                  )}
                                  <TableCell align="center">
                                    {row.created_at}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        component="div"
                        count={totalRows}
                        page={page}
                        onChangePage={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10]}
                      />
                    </div>
                  )}
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
