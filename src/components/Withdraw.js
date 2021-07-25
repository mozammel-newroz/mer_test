import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Form from "react-validation/build/form";
import MoneyService from "../services/alltransactions.service";
//import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import Navbar from "../components/Navbar";
import CheckButton from "react-validation/build/button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Vnavbar from "../components/Vnavbar";
import SideBar from "../components/sidebar";
import MobileView from "./MobileView";
import Footer from "./Footer";
import $ from "jquery";
import hostAPI from "../services/GetHost";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";

let Base_URL = `${hostAPI.getHost()}`;

const styless = StyleSheet.create({
  page: {
    //   flexDirection: 'row',
    //   backgroundColor: '#E4E4E4',
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

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangePin = this.onChangePin.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);

    this.handleClose1 = this.handleClose1.bind(this);
    this.handleConfirmPIN = this.handleConfirmPIN.bind(this);

    this.state = {
      receiver_mobile_number: "",
      amount: "",
      pin: "",
      successful: false,
      loading: false,
      loading1: false,
      message: "",
      recipient: "",
      mobile_number: "",
      avatar: "",
      invoice_id: "",
      open2: false,
      open3: false,
      date: "",
      transaction_id: "",
      transaction_type: "",
      nature_of_transaction: "",
      transaction_amount: "",
      transaction_fee: "",
      total_deduction: "",
      title: "",
      name: "",
      msisdn: "",
      type: "",
      how_to: "",
      charge: "",
      total_payable: "",
      contentStep: true,
      confirmStep: false,
      SuccessStep: false,
      FailedStep: false,
      amountIQD: "",
      failed: false,
    };
  }

  componentDidMount() {
    // const user = AuthService.getCurrentUser();
    // if (!user) {
    //   this.props.history.push("/login");
    //   window.location.reload();
    // }

    $(document).ready(function () {
      $("#myNum").keypress(function () {
        if (this.value.length == 11) {
          return false;
        }
      });
    });
  }

  onChangeMobile(e) {
    this.setState({
      receiver_mobile_number: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onChangePin(e) {
    this.setState({
      pin: e.target.value,
    });
  }

  handleSend(e) {
    e.preventDefault();

    this.setState({
      message: [],
      recipient: "",
      mobile_number: "",
      avatar: "",
      invoice_id: "",
      successful: false,
      contentStep: false,
      confirmStep: true,
      SuccessStep: false,
      FailedStep: false,
      loading1: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      MoneyService.withdrawMoney(
        this.state.receiver_mobile_number,
        this.state.amount,
        this.state.pin
      ).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response && response.data && response.data.messages,
              successful: false,
              contentStep: false,
              confirmStep: false,
              SuccessStep: false,
              FailedStep: true,
              loading1: false,
            });
          } else {
            setTimeout(
              function () {
                this.setState({
                  message: response && response.data && response.data.messages,
                  recipient:
                    response &&
                    response.data &&
                    response.data.data &&
                    response.data.data.summary &&
                    response.data.data.summary.recipient &&
                    response.data.data.summary.recipient.name,
                  mobile_number:
                    response &&
                    response.data &&
                    response.data.data &&
                    response.data.data.summary &&
                    response.data.data.summary.recipient &&
                    response.data.data.summary.recipient.mobile_number,
                  avatar:
                    response &&
                    response.data &&
                    response.data.data &&
                    response.data.data.summary &&
                    response.data.data.summary.recipient &&
                    response.data.data.summary.recipient.avatar,
                  invoice_id:
                    response &&
                    response.data &&
                    response.data.data &&
                    response.data.data.summary &&
                    response.data.data.summary.invoice_id,
                  contentStep: false,
                  confirmStep: false,
                  successful: true,
                  SuccessStep: true,
                  FailedStep: false,
                  loading1: false,
                });
              }.bind(this),
              1500
            );
          }
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            Cookies.remove("Mtoken");
            localStorage.clear();
            this.props.history.push("/login");
            window.location.reload();
          }
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.messages) ||
            error.message ||
            error.toString();

          this.setState({
            contentStep: false,
            confirmStep: false,
            SuccessStep: false,
            FailedStep: true,
            successful: false,
            message: resMessage,
            loading1: false,
          });
        }
      );
    }
  }

  handleConfirm(e) {
    e.preventDefault();

    this.setState({
      message: [],
      recipient: "",
      mobile_number: "",
      avatar: "",
      successful: false,
      loading: true,
      charge: "",
      total_payable: "",
      confirmStep: false,
      contentStep: true,
      SuccessStep: false,
      amountIQD: "",
      failed: false,
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      MoneyService.withdrawMoneySummary(
        this.state.receiver_mobile_number,
        this.state.amount
      ).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              contentStep: true,
              confirmStep: false,
              SuccessStep: false,
              message: response && response.data && response.data.messages,
              successful: false,
              loading: false,
              failed: true,
            });
          } else {
            this.setState({
              contentStep: false,
              confirmStep: true,
              SuccessStep: false,
              message: response && response.data && response.data.messages,
              recipient:
                response &&
                response.data &&
                response.data.data &&
                response.data.data.summary &&
                response.data.data.summary.recipient &&
                response.data.data.summary.recipient.name,
              mobile_number:
                response &&
                response.data &&
                response.data.data &&
                response.data.data.summary &&
                response.data.data.summary.recipient &&
                response.data.data.summary.recipient.mobile_number,
              avatar:
                response &&
                response.data &&
                response.data.data &&
                response.data.data.summary &&
                response.data.data.summary.recipient &&
                response.data.data.summary.recipient.avatar,
              amountIQD:
                response &&
                response.data &&
                response.data.data &&
                response.data.data.summary &&
                response.data.data.summary.amount,
              charge:
                response &&
                response.data &&
                response.data.data &&
                response.data.data.summary &&
                response.data.data.summary.charge,
              total_payable:
                response &&
                response.data &&
                response.data.data &&
                response.data.data.summary &&
                response.data.data.summary.total_payable,
              successful: true,
              loading: false,
              failed: false,
            });
          }
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            Cookies.remove("Mtoken");
            localStorage.clear();
            this.props.history.push("/login");
            window.location.reload();
          }
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.messages) ||
            error.message ||
            error.toString();

          this.setState({
            contentStep: true,
            confirmStep: false,
            SuccessStep: false,
            successful: false,
            failed: true,
            message: resMessage,
          });
        }
      );
    }
  }

  handleClose1 = () => {
    this.setState({
      open1: false,
    });
  };

  handleConfirmPIN = () => {
    this.setState({
      open1: true,
    });
  };

  handleClose2(e) {
    e.preventDefault();

    this.setState({
      open2: false,
    });
  }

  handleClose3(e) {
    e.preventDefault();

    this.setState({
      open3: false,
    });
  }

  downloadInvoice(e, id) {
    e.preventDefault();

    this.setState({
      transaction_id: "",
      open3: false,
      date: "",
      transaction_type: "",
      nature_of_transaction: "",
      transaction_amount: "",
      transaction_fee: "",
      total_deduction: "",
      title: "",
      name: "",
      type: "",
      how_to: "",
      msisdn: "",
      avatar: "",
    });

    axios
      .get(
        `${Base_URL}api/v1/private/user/transaction/invoice?invoice_id=${id}&lang=${localStorage.getItem(
          "MnewLocale"
        )}`,
        { headers: authHeader() }
      )
      .then((response) => {
        this.setState({
          open3: true,
          transaction_id:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_id,
          date:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.date,
          transaction_type:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_type,
          nature_of_transaction:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.nature_of_transaction,
          transaction_amount:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_amount,
          transaction_fee:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_fee,
          total_deduction:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.total_deduction,
          title:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient.title,
          name:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient &&
            response.data.data.recipient.name,
          type:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.card &&
            response.data.data.card.type,
          how_to:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.card &&
            response.data.data.card.how_to,
          msisdn:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient &&
            response.data.data.recipient.msisdn,
          avatar:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient &&
            response.data.data.recipient.avatar,
        });
      });
  }

  handleViewInvoice(e, id) {
    e.preventDefault();

    this.setState({
      transaction_id: "",
      open2: false,
      date: "",
      transaction_type: "",
      transaction_amount: "",
      transaction_fee: "",
      total_deduction: "",
      title: "",
      name: "",
      type: "",
      how_to: "",
      thumbnail: "",
      msisdn: "",
      avatar: "",
    });

    axios
      .get(
        `${Base_URL}api/v1/private/user/transaction/invoice?invoice_id=${id}&lang=${localStorage.getItem(
          "MnewLocale"
        )}`,
        { headers: authHeader() }
      )
      .then((response) => {
        this.setState({
          open2: true,
          transaction_id:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_id,
          date:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.date,
          transaction_type:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_type,
          transaction_amount:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_amount,
          transaction_fee:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.transaction_fee,
          total_deduction:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.total_deduction,
          title:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient &&
            response.data.data.recipient.title,
          name:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient &&
            response.data.data.recipient.name,
          type:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.card &&
            response.data.data.card.type,
          how_to:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.card &&
            response.data.data.card.how_to,
          thumbnail:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.card &&
            response.data.data.card.thumbnail,
          msisdn:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient &&
            response.data.data.recipient.msisdn,
          avatar:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.recipient &&
            response.data.data.recipient.avatar,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div className="WebView">
            <Navbar />
            <div id="content">
              <div>
                <div
                  className=" asideTabView"
                  style={{ backgroundColor: "#F0F6FA" }}
                >
                  <div className="col-lg-1 pt-4">
                    <Vnavbar />
                  </div>
                  <br />
                  <div className="pt-4">
                    <SideBar />
                  </div>
                </div>
                <div className="row" style={{ margin: "0" }}>
                  <div
                    className="col-lg-1 pt-4 asideDesktopView SideDesktopView"
                    style={{ backgroundColor: "#F0F6FA" }}
                  >
                    <Vnavbar />
                  </div>
                  <br />
                  <div
                    className="col-lg-3 col-s-12 pt-4 asideDesktopView SideDesktopView"
                    style={{ backgroundColor: "#F0F6FA" }}
                  >
                    <SideBar />
                  </div>

                  <div className="col-lg-8 col-s-12 pt-4">
                    {this.state.contentStep && (
                      <div id="content" style={{ paddingTop: "13%" }}>
                        <div className="">
                          <div className="row">
                            <div className="col-md-9 col-lg-8 col-xl-6 mx-auto">
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <Form
                                  id="form-confirm-money"
                                  onSubmit={this.handleConfirm}
                                  ref={(c) => {
                                    this.form = c;
                                  }}
                                >
                                  {!this.state.successful && (
                                    <div>
                                      <h3 className="text-5 font-weight-600 mb-3 mb-sm-4 text-center">
                                        <FormattedMessage
                                          id="Withdraw-Money"
                                          defaultMessage="Withdraw Money"
                                        />
                                      </h3>
                                      <div className="form-group">
                                        <label
                                          htmlFor="receiver_mobile_number"
                                          className="font-weight-600"
                                        >
                                          <FormattedMessage
                                            id="withdraw_page_agent_number"
                                            defaultMessage="Agent Number"
                                          />
                                          :
                                        </label>
                                        <div className="input-group">
                                          <div className="input-group-prepend">
                                            {" "}
                                            <span
                                              className="input-group-text"
                                              style={{
                                                width: "63px",
                                                backgroundColor: "#fff",
                                                borderRadius: "16px 0 0 16px",
                                                borderLeft:
                                                  "1px solid #3494E629",
                                                borderTop:
                                                  "1px solid #3494E629",
                                                borderBottom:
                                                  "1px solid #3494E629",
                                                borderRight: "none",
                                              }}
                                            >
                                              +964
                                            </span>{" "}
                                          </div>
                                          <NumberFormat
                                            placeholder="Enter Mobile Number"
                                            //         hintText="Enter Mobile Number"
                                            value={
                                              this.state.receiver_mobile_number
                                            }
                                            onChange={this.onChangeMobile}
                                            name="receiver_mobile_number"
                                            className="form-control"
                                            style={{
                                              borderRadius: "0 16px 16px 0",
                                              borderLeft: "none",
                                              borderRight:
                                                "1px solid #3494E629",
                                              borderTop: "1px solid #3494E629",
                                              borderBottom:
                                                "1px solid #3494E629",
                                            }}
                                            id="receiver_mobile_number"
                                            data-bv-field="receiver_mobile_number"
                                            validations={[required]}
                                            required
                                            format="### ### ####"
                                            mask="_"
                                          />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label
                                          htmlFor="amount"
                                          className="font-weight-600"
                                        >
                                          <FormattedMessage
                                            id="app_common_amount"
                                            defaultMessage="Amount"
                                          />
                                        </label>
                                        <div className="input-group">
                                          <div className="input-group-prepend">
                                            {" "}
                                            <span
                                              className="input-group-text"
                                              style={{
                                                width: "63px",
                                                backgroundColor: "#fff",
                                                borderRadius: "16px 0 0 16px",
                                                borderLeft:
                                                  "1px solid #3494E629",
                                                borderTop:
                                                  "1px solid #3494E629",
                                                borderBottom:
                                                  "1px solid #3494E629",
                                                borderRight: "none",
                                              }}
                                            >
                                              &nbsp;IQD
                                            </span>{" "}
                                          </div>
                                          <input
                                            className="form-control zipcode-number"
                                            value={this.state.amount}
                                            onChange={this.onChangeAmount}
                                            style={{
                                              borderRadius: "0 16px 16px 0",
                                              borderLeft: "none",
                                              borderRight:
                                                "1px solid #3494E629",
                                              borderTop: "1px solid #3494E629",
                                              borderBottom:
                                                "1px solid #3494E629",
                                            }}
                                            required
                                            type="number"
                                            name="amount"
                                            id="myNum"
                                          />

                                          {/* <NumberFormat
                                            isAllowed={(values) => {
                                              const {
                                                formattedValue,
                                                floatValue,
                                              } = values;
                                              return (
                                                formattedValue === "" ||
                                                floatValue <= 99999999999
                                              );
                                            }}
                                            placeholder="Amount"
                                            //        hintText="Amount"
                                            value={this.state.amount}
                                            onChange={this.onChangeAmount}
                                            name="amount"
                                            className="form-control"
                                            id="amount"
                                            data-bv-field="amount"
                                            validations={[required]}
                                            required
                                            thousandSeparator={true}
                                            //          prefix={"IQD "}
                                            mask="_"
                                          /> */}
                                        </div>
                                      </div>

                                      <br />
                                      <br />
                                      <div className="text-center">
                                        <button
                                          className="btn btn-primary"
                                          style={{
                                            borderRadius: "50px",
                                            width: "90%",
                                          }}
                                          disabled={this.state.loading}
                                        >
                                          {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                          )}
                                          <FormattedMessage
                                            id="app_common_next"
                                            defaultMessage="Next"
                                          />
                                        </button>
                                      </div>
                                      {this.state.failed && (
                                        <h2
                                          style={{
                                            color: "#fc2861",
                                            padding: "15px 15px 0 15px",
                                            textAlign: "center",
                                            fontSize: "17px",
                                          }}
                                        >
                                          {this.state.message}
                                        </h2>
                                      )}
                                    </div>
                                  )}

                                  <CheckButton
                                    style={{ display: "none" }}
                                    ref={(c) => {
                                      this.checkBtn = c;
                                    }}
                                  />
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {this.state.confirmStep && (
                      <div id="confirm" style={{ paddingTop: "13%" }}>
                        <div className="">
                          <div className="row">
                            <div className="col-md-9 col-lg-8 col-xl-6 mx-auto">
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <Form
                                  id="form-send-money"
                                  onSubmit={this.handleSend}
                                  ref={(c) => {
                                    this.form = c;
                                  }}
                                >
                                  {this.state.successful && (
                                    <div>
                                      <h3 className="text-5 font-weight-600 mb-3 mb-sm-4 text-center">
                                        <FormattedMessage
                                          id="Withdraw-Money"
                                          defaultMessage="Withdraw Money"
                                        />
                                      </h3>

                                      <p htmlFor="receiver_mobile_number">
                                        <FormattedMessage
                                          id="From_Agent"
                                          defaultMessage="From Agent"
                                        />{" "}
                                        :
                                      </p>
                                      <div
                                        className="form-group"
                                        style={{ display: "inline-flex" }}
                                      >
                                        {this.state.avatar ? (
                                          <div>
                                            <img
                                              src={this.state.avatar}
                                              alt=""
                                              className="summaryAvater"
                                            />
                                          </div>
                                        ) : (
                                          <div></div>
                                        )}

                                        <div
                                          style={{
                                            marginLeft: "20px",
                                            fontSize: "16px",
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          <p style={{ marginBottom: 0 }}>
                                            {this.state.recipient}
                                          </p>
                                          <p>
                                            {this.state.receiver_mobile_number}
                                          </p>
                                        </div>
                                      </div>

                                      <p className="mb-1">
                                        <FormattedMessage
                                          id="withdraw_page_withdraw_amount"
                                          defaultMessage="Withdraw Amount"
                                        />{" "}
                                        <span className="text-3 float-right">
                                          {this.state.amountIQD}
                                        </span>
                                      </p>
                                      <p className="mb-1">
                                        <FormattedMessage
                                          id="app_common_charge"
                                          defaultMessage="Charge"
                                        />{" "}
                                        <span className="text-3 float-right">
                                          {this.state.charge}
                                        </span>
                                      </p>
                                      <hr />
                                      <p className="text-4 font-weight-500">
                                        <FormattedMessage
                                          id="Total_Amount"
                                          defaultMessage="Total Amount"
                                        />

                                        <span className="float-right">
                                          {this.state.total_payable}
                                        </span>
                                      </p>

                                      <div style={{ display: "flex" }}>
                                        <a
                                          href="/withdraw"
                                          className="btn"
                                          style={{
                                            borderRadius: "50px",
                                            marginRight: "auto",
                                            width: "45%",
                                          }}
                                        >
                                          <FormattedMessage
                                            id="Cancel"
                                            defaultMessage="Cancel"
                                          />
                                        </a>
                                        <a
                                          href="#"
                                          className="btn btn-primary"
                                          style={{
                                            borderRadius: "50px",
                                            width: "45%",
                                          }}
                                          onClick={this.handleConfirmPIN}
                                        >
                                          <FormattedMessage
                                            id="app_common_confirm"
                                            defaultMessage="Confirm"
                                          />
                                        </a>
                                      </div>

                                      <Modal
                                        style={{ paddingTop: "10%" }}
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={this.state.open1}
                                        onClose={this.handleClose1}
                                        //     closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                          timeout: 1000,
                                        }}
                                      >
                                        <Fade in={this.state.open1}>
                                          <div
                                            className="col-md-9 col-lg-8 col-xl-6 mx-auto"
                                            style={{ width: "500px" }}
                                          >
                                            <div
                                              className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                              style={{ borderRadius: "16px" }}
                                            >
                                              <div
                                                className="modal-dialog transaction-details"
                                                role="document"
                                              >
                                                <div className="modal-content">
                                                  <div className="form-group">
                                                    <label htmlFor="pin">
                                                      <FormattedMessage
                                                        id="Your_PIN_Number"
                                                        defaultMessage="Your PIN Number"
                                                      />
                                                    </label>

                                                    <NumberFormat
                                                      placeholder="Enter 4-digits PIN"
                                                      name="pin"
                                                      className="form-control MerchantInput"
                                                      value={this.state.pin}
                                                      onChange={
                                                        this.onChangePin
                                                      }
                                                      required
                                                      validations={[required]}
                                                      data-bv-field="pin"
                                                      id="pin"
                                                      mask="_"
                                                      maxLength="4"
                                                      type="password"
                                                      autoFocus
                                                    />
                                                  </div>
                                                  <div className="text-center">
                                                    <button
                                                      className="btn btn-primary"
                                                      style={{
                                                        borderRadius: "50px",
                                                        width: "90%",
                                                      }}
                                                      onClick={this.handleSend}
                                                      disabled={
                                                        this.state.loading
                                                      }
                                                    >
                                                      {this.state.loading && (
                                                        <CircularProgress
                                                          size={15}
                                                        />
                                                      )}
                                                      <FormattedMessage
                                                        id="home_page_withdraw"
                                                        defaultMessage="Withdraw"
                                                      />
                                                    </button>
                                                  </div>
                                                  {this.state.failed && (
                                                    <h2
                                                      style={{
                                                        color: "#fc2861",
                                                        padding:
                                                          "15px 15px 0 15px",
                                                        textAlign: "center",
                                                        fontSize: "17px",
                                                      }}
                                                    >
                                                      {this.state.message}
                                                    </h2>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Fade>
                                      </Modal>
                                    </div>
                                  )}

                                  <CheckButton
                                    style={{ display: "none" }}
                                    ref={(c) => {
                                      this.checkBtn = c;
                                    }}
                                  />
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {this.state.message && (
                      <div style={{ textAlign: "center" }}>
                        {this.state.loading1 && (
                          <CircularProgress
                            size={40}
                            style={{ color: "#f91351" }}
                          />
                        )}
                        {this.state.SuccessStep && (
                          <div id="success" style={{ paddingTop: "13%" }}>
                            <div>
                              <div className="row">
                                <div className="col-md-9 col-lg-8 col-xl-6 mx-auto">
                                  <div className="bg-white text-center shadow-md rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                                    <div className="my-4">
                                      <p className="text-success text-20 line-height-07">
                                        <i className="fas fa-check-circle"></i>
                                      </p>
                                      <p className="text-success text-8 font-weight-500 line-height-07">
                                        <FormattedMessage
                                          id="app_common_api_success"
                                          defaultMessage="Success"
                                        />
                                        !
                                      </p>
                                      <p className="lead">
                                        <FormattedMessage
                                          id="Transaction_Complete"
                                          defaultMessage="Transaction Complete"
                                        />
                                      </p>
                                    </div>
                                    <p className="text-3 mb-4">
                                      <FormattedMessage
                                        id="Succesfully_sent"
                                        defaultMessage="You've Succesfully sent"
                                      />{" "}
                                      <span className="text-4 font-weight-500">
                                        {this.state.amountIQD}
                                      </span>{" "}
                                      <FormattedMessage
                                        id="to"
                                        defaultMessage="to"
                                      />{" "}
                                      <span
                                        className="font-weight-500"
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {this.state.name}
                                      </span>
                                      ,{" "}
                                      <FormattedMessage
                                        id="See_transaction_details"
                                        defaultMessage="See transaction details under"
                                      />{" "}
                                      <a
                                        className="btn-link"
                                        href="/transactions"
                                      >
                                        <FormattedMessage
                                          id="Activity"
                                          defaultMessage="Activity"
                                        />
                                      </a>
                                      .
                                    </p>
                                    <button
                                      className="btn btn-primary"
                                      style={{
                                        borderRadius: "50px",
                                        width: "90%",
                                      }}
                                      onClick={(event) =>
                                        this.handleViewInvoice(
                                          event,
                                          this.state.invoice_id
                                        )
                                      }
                                    >
                                      <FormattedMessage
                                        id="View_Invoice"
                                        defaultMessage="View Invoice"
                                      />
                                    </button>

                                    <Modal
                                      className="ModalStyle"
                                      aria-labelledby="transition-modal-title"
                                      aria-describedby="transition-modal-description"
                                      open={this.state.open2}
                                      onClose={this.handleClose2}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500,
                                      }}
                                    >
                                      <Fade in={this.state.open2}>
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
                                                        <div>
                                                          <ul className="list-unstyled">
                                                            <li className="text-muted">
                                                              <div>
                                                                {this.state
                                                                  .recipient ? (
                                                                  <img
                                                                    width={100}
                                                                    src={
                                                                      this.state
                                                                        .avatar
                                                                    }
                                                                    alt=""
                                                                    style={{
                                                                      border:
                                                                        "1px solid #ec247c",
                                                                      borderRadius:
                                                                        "50%",
                                                                    }}
                                                                  />
                                                                ) : null}
                                                              </div>
                                                            </li>
                                                          </ul>

                                                          <h3 className="text-4 text-white font-weight-400 my-3">
                                                            {this.state.title}
                                                          </h3>
                                                          <h3
                                                            className="text-4 text-white font-weight-400 my-3"
                                                            style={{
                                                              textTransform:
                                                                "capitalize",
                                                            }}
                                                          >
                                                            {this.state.name}
                                                          </h3>
                                                        </div>
                                                      </div>

                                                      <div className="text-8 font-weight-500 text-white my-4">
                                                        {
                                                          this.state
                                                            .transaction_amount
                                                        }
                                                      </div>
                                                      <p className="text-white">
                                                        {this.state.date}
                                                      </p>
                                                      <p
                                                        className="text-white"
                                                        style={{
                                                          cursor: "pointer",
                                                          textDecoration:
                                                            "underline",
                                                        }}
                                                        onClick={(e) =>
                                                          this.downloadInvoice(
                                                            e,
                                                            this.state
                                                              .transaction_id
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
                                                        onClick={
                                                          this.handleClose2
                                                        }
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
                                                              this.state
                                                                .transaction_amount
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
                                                              this.state
                                                                .transaction_fee
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
                                                            this.state
                                                              .total_deduction
                                                          }
                                                        </span>
                                                      </p>
                                                      <ul className="list-unstyled">
                                                        <li className="font-weight-500">
                                                          <FormattedMessage
                                                            id="TransactionID"
                                                            defaultMessage="Transaction ID"
                                                          />{" "}
                                                          :
                                                        </li>
                                                        <li className="text-muted">
                                                          {
                                                            this.state
                                                              .transaction_id
                                                          }
                                                        </li>
                                                      </ul>
                                                      <ul className="list-unstyled">
                                                        <li className="font-weight-500">
                                                          <FormattedMessage
                                                            id="description"
                                                            defaultMessage="Description"
                                                          />{" "}
                                                          :
                                                        </li>
                                                        <li className="text-muted">
                                                          {
                                                            this.state
                                                              .nature_of_transaction
                                                          }{" "}
                                                          -{" "}
                                                          {
                                                            this.state
                                                              .transaction_type
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
                                                          {this.state.date}
                                                        </li>
                                                      </ul>
                                                      {this.state.recipient ? (
                                                        <div>
                                                          {/* <ul className="list-unstyled">
                                                          <li className="font-weight-500">
                                                            Recipient Title:
                                                          </li>
                                                          <li className="text-muted">
                                                            {" "}
                                                            {this.state
                                                              .title
                                                              ? this.state
                                                                  .title
                                                              : null}
                                                          </li>
                                                        </ul> */}

                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                              <FormattedMessage
                                                                id="Recipient_Name"
                                                                defaultMessage="Recipient Name"
                                                              />
                                                              :
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {this.state.name
                                                                ? this.state
                                                                    .name
                                                                : null}
                                                            </li>
                                                          </ul>

                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                              <FormattedMessage
                                                                id="Recipient_Name"
                                                                defaultMessage="Mobile_No"
                                                              />{" "}
                                                              :
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {this.state.msisdn
                                                                ? this.state
                                                                    .msisdn
                                                                : null}
                                                            </li>
                                                          </ul>
                                                        </div>
                                                      ) : null}

                                                      {this.state.type ? (
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
                                                            {this.state.type
                                                              ? this.state.type
                                                              : null}
                                                          </li>
                                                        </ul>
                                                      ) : null}

                                                      {this.state.how_to ? (
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
                                                            {this.state.how_to
                                                              ? this.state
                                                                  .how_to
                                                              : null}
                                                          </li>
                                                        </ul>
                                                      ) : null}

                                                      {this.state.thumbnail ? (
                                                        <ul className="list-unstyled">
                                                          <li className="text-muted">
                                                            {" "}
                                                            {this.state
                                                              .thumbnail ? (
                                                              <img
                                                                width={200}
                                                                src={
                                                                  this.state
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
                                                      ) : null}
                                                    </div>
                                                  </div>

                                                  {/* PDF Model */}
                                                  <Modal
                                                    className="ModalStyle"
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    open={this.state.open3}
                                                    onClose={this.handleClose3}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                      timeout: 500,
                                                    }}
                                                  >
                                                    <Fade in={this.state.open3}>
                                                      <div>
                                                        <div
                                                          className="modal-dialog modal-dialog-centered transaction-details"
                                                          role="document"
                                                        >
                                                          <div className="modal-content">
                                                            <div className="modal-body">
                                                              <PDFViewer
                                                                style={{
                                                                  width: "100%",
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .title
                                                                            }
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .name
                                                                            }
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .date
                                                                            }
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .transaction_id
                                                                            }
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .nature_of_transaction
                                                                            }{" "}
                                                                            {
                                                                              " - "
                                                                            }{" "}
                                                                            {
                                                                              this
                                                                                .state
                                                                                .transaction_type
                                                                            }
                                                                          </Text>
                                                                        </View>
                                                                      </View>

                                                                      {this
                                                                        .state
                                                                        .name && (
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
                                                                              {
                                                                                this
                                                                                  .state
                                                                                  .name
                                                                              }
                                                                            </Text>
                                                                          </View>
                                                                        </View>
                                                                      )}
                                                                      {this
                                                                        .state
                                                                        .msisdn && (
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
                                                                              {
                                                                                this
                                                                                  .state
                                                                                  .msisdn
                                                                              }
                                                                            </Text>
                                                                          </View>
                                                                        </View>
                                                                      )}

                                                                      {this
                                                                        .state
                                                                        .type && (
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
                                                                              {this
                                                                                .state
                                                                                .type
                                                                                ? this
                                                                                    .state
                                                                                    .type
                                                                                : null}
                                                                            </Text>
                                                                          </View>
                                                                        </View>
                                                                      )}

                                                                      {this
                                                                        .state
                                                                        .how_to && (
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
                                                                              {this
                                                                                .state
                                                                                .how_to
                                                                                ? this
                                                                                    .state
                                                                                    .how_to
                                                                                : null}
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .transaction_amount
                                                                            }
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .transaction_fee
                                                                            }
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
                                                                            {
                                                                              this
                                                                                .state
                                                                                .total_deduction
                                                                            }
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

                                          <div></div>
                                        </div>
                                      </Fade>
                                    </Modal>

                                    {/* <a className="text-3 d-inline-block btn-link mt-4" href="#"><i className="fas fa-print"></i> Print</a>  */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {this.state.message && (
                      <div>
                        {this.state.FailedStep && (
                          <div id="fail" style={{ paddingTop: "13%" }}>
                            <div>
                              <div className="row">
                                <div className="col-md-9 col-lg-8 col-xl-6 mx-auto">
                                  <div className="bg-white text-center shadow-md rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                                    <div className="my-4">
                                      <p className="text-danger text-20 line-height-07">
                                        <i className="fas fa-times-circle"></i>
                                      </p>
                                      <p className="text-danger text-8 font-weight-500 line-height-07">
                                        <FormattedMessage
                                          id="app_common_failed"
                                          defaultMessage="Failed"
                                        />{" "}
                                        !
                                      </p>
                                      <p className="lead">
                                        <FormattedMessage
                                          id="Transaction_Failed"
                                          defaultMessage="Transaction Failed"
                                        />
                                      </p>
                                    </div>
                                    <p className="text-3 mb-4">
                                      <span className="text-4 font-weight-500">
                                        {this.state.message}
                                      </span>{" "}
                                      <br />
                                      <FormattedMessage
                                        id="app_common_try_again"
                                        defaultMessage="Try Again"
                                      />{" "}
                                      <a className="btn-link" href="/withdraw">
                                        <FormattedMessage
                                          id="Withdraw-Money"
                                          defaultMessage="Withdraw Money"
                                        />
                                      </a>
                                      .
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          <MobileView />
        </div>
      </React.Fragment>
    );
  }
}
