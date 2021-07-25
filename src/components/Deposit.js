import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Form from "react-validation/build/form";
import MoneyService from "../services/alltransactions.service";
import axios from "axios";
import authHeader from "../services/auth-header";
import Navbar from "../components/Navbar";
import CheckButton from "react-validation/build/button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
//import AuthService from "../services/auth.service";
import Vnavbar from "../components/Vnavbar";
import SideBar from "../components/sidebar";
import hostAPI from "../services/GetHost";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Deposit extends Component {
  constructor(props) {
    super(props);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.onChangeCardNumber = this.onChangeCardNumber.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);

    this.state = {
      card_number: "",
      successful: false,
      loading: false,
      message: "",
      recipient: "",
      mobile_number: "",
      avatar: "",
      invoice_id: "",
      open2: false,
      date: "",
      transaction_id: "",
      transaction_type: "",
      transaction_amount: "",
      transaction_fee: "",
      total_deduction: "",
      title: "",
      name: "",
      msisdn: "",
      charge: "",
      total_payable: "",
      contentStep: true,
      confirmStep: false,
      SuccessStep: false,
      FailedStep: false,
      amountIQD: "",
    };
  }

  // componentDidMount() {
  //   const user = AuthService.getCurrentUser();
  //   if (!user) {
  //     this.props.history.push("/login");
  //     window.location.reload();
  //   }
  // }

  onChangeCardNumber(e) {
    this.setState({
      card_number: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  handleDeposit(e) {
    e.preventDefault();

    this.setState({
      message: [],
      recipient: "",
      mobile_number: "",
      avatar: "",
      invoice_id: "",
      successful: false,
      loading: true,
      contentStep: false,
      confirmStep: true,
      SuccessStep: false,
      FailedStep: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      MoneyService.depositMoney(this.state.card_number).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response.data.messages,
              successful: false,
              loading: false,
              contentStep: false,
              confirmStep: false,
              SuccessStep: false,
              FailedStep: true,
            });
          } else {
            this.setState({
              message: response.data.messages,
              recipient: response.data.data.summary.recipient.name,
              mobile_number: response.data.data.summary.recipient.mobile_number,
              avatar: response.data.data.summary.recipient.avatar,
              invoice_id: response.data.data.summary.invoice_id,
              successful: true,
              contentStep: false,
              confirmStep: false,
              SuccessStep: true,
              FailedStep: false,
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
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            loading: false,
            message: resMessage,
            contentStep: false,
            confirmStep: false,
            SuccessStep: false,
            FailedStep: true,
          });
        }
      );
    }
  }
  handleClose2(e) {
    e.preventDefault();

    this.setState({
      open2: false,
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
      msisdn: "",
      avatar: "",
    });

    // setOpen(true);
    axios
      .get(
        `${Base_URL}api/v1/private/user/transaction/invoice?invoice_id=${id}&lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      )
      .then((response) => {
        console.log("id" + response.data.data.transaction_id);

        this.setState({
          open2: true,
          transaction_id: response.data.data.transaction_id,
          date: response.data.data.date,
          transaction_type: response.data.data.transaction_type,
          transaction_amount: response.data.data.transaction_amount,
          transaction_fee: response.data.data.transaction_fee,
          total_deduction: response.data.data.total_deduction,
          title: response.data.data.recipient.title,
          name: response.data.data.recipient.name,
          msisdn: response.data.data.recipient.msisdn,
          avatar: response.data.data.recipient.avatar,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar />
          <div id="content" className="py-4">
            <div className="container-fluid">
              <div className="container-fluid">
                <div className="row">
                  <div
                    className="col-lg-1"
                    style={{ backgroundColor: "#F0F6FA" }}
                  >
                    <Vnavbar />
                  </div>
                  <div
                    className="col-lg-3"
                    style={{ backgroundColor: "#F0F6FA" }}
                  >
                    <SideBar />
                  </div>

                  <div className="col-lg-8">
                    {this.state.contentStep && (
                      <div id="content" style={{ paddingTop: "13%" }}>
                        <div>
                          <div className="row">
                            <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
                              <div className="bg-white shadow-md rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                                <Form
                                  id="form-confirm-money"
                                  onSubmit={this.handleDeposit}
                                  ref={(c) => {
                                    this.form = c;
                                  }}
                                >
                                  {!this.state.successful && (
                                    <div>
                                      <h3 className="text-5 font-weight-600 mb-3 mb-sm-4 text-center">
                                      <FormattedMessage
                      id="home_page_latest_transactions"
                      defaultMessage="Refund Money"
                    />
                                        
                                      </h3>
                                      <div className="form-group">
                                        <h6
                                          htmlFor="receiver_mobile_number"
                                          className="font-weight-600"
                                        >
                                        <FormattedMessage
                      id="Card_Number"
                      defaultMessage="Card Number"
                    />
                                          
                                        </h6>
                                        <div className="input-group">
                                          <NumberFormat
                                            isAllowed={(values) => {
                                              const {
                                                formattedValue,
                                                floatValue,
                                              } = values;
                                              return (
                                                formattedValue === "" ||
                                                (floatValue <= 99999999999 &&
                                                  floatValue >= 0)
                                              );
                                            }}
                                            placeholder="Enter Card Number"
                                            // hintText="Enter Mobile Number"
                                            value={this.state.card_number}
                                            onChange={this.onChangeCardNumber}
                                            style={{ borderLeft: "none" }}
                                            name="card_number"
                                            className="form-control"
                                            id="card_number"
                                            data-bv-field="card_number"
                                            validations={[required]}
                                            required
                                            //  format="##############"
                                            mask="_"
                                          />
                                        </div>
                                      </div>

                                      <br />
                                      <br />
                                      <div className="text-center">
                                        <button
                                          className="btn btn-primary"
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
                                          id="Deposit_Money"
                                          defaultMessage="Deposit Money"
                                        />
                                          
                                        </button>
                                      </div>
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
                      <div>
                        {this.state.SuccessStep && (
                          <div id="success" style={{ paddingTop: "13%" }}>
                            <div>
                              <h2 className="font-weight-400 text-center mt-3">
                              <FormattedMessage
                                          id="Deposit_Money"
                                          defaultMessage="Deposit Money"
                                        />
                              </h2>

                              <div className="row">
                                <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
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
                                          id="Succesfully_deposit"
                                          defaultMessage="You've Succesfully deposit money to"
                                        />
                                      {" "}
                                      <span className="text-4 font-weight-500">
                                        {this.state.amountIQD}
                                      </span>{" "}
                                      <FormattedMessage
                                          id="to"
                                          defaultMessage="to"
                                        />
                                      {" "}
                                      <span
                                        className="font-weight-500"
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {this.state.name}
                                      </span>
                                      , <FormattedMessage
                                          id="to"
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
                                      className="btn btn-primary btn-block"
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
                                                    </div>
                                                  </div>
                                                  <div className="col-sm-7">
                                                    <h5 className="text-5 font-weight-400 m-3">
                                                      Transaction Details
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
                                                        />
                                                          {" "}
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
                                                        />
                                                          {" "}
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
                                                        /> {" "}
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
                                                        />
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
                                                        />
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
                                                          id="Mobile_No"
                                                          defaultMessage="Mobile No."
                                                        />
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

                                                      {this.state.card ? (
                                                        <div>
                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                            <FormattedMessage
                                                          id="Card_Type"
                                                          defaultMessage="Card Type"
                                                        />
                                                              :
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {this.state.card
                                                                .type
                                                                ? this.state
                                                                    .card.type
                                                                : null}
                                                            </li>
                                                          </ul>

                                                          <ul className="list-unstyled">
                                                            <li className="font-weight-500">
                                                            <FormattedMessage
                                                          id="Card_Type"
                                                          defaultMessage="Card Type"
                                                        />:
                                                            </li>
                                                            <li className="text-muted">
                                                              {" "}
                                                              {this.state.card
                                                                .how_to
                                                                ? this.state
                                                                    .card.how_to
                                                                : null}
                                                            </li>
                                                          </ul>

                                                          <ul className="list-unstyled">
                                                            <li className="text-muted">
                                                              {" "}
                                                              {this.state.card
                                                                .thumbnail ? (
                                                                <img
                                                                  width={200}
                                                                  src={
                                                                    this.state
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
                              <h2 className="font-weight-400 text-center mt-3">
                                Deposit Money
                              </h2>

                              <div className="row">
                                <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
                                  <div className="bg-white text-center shadow-md rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                                    <div className="my-4">
                                      <p className="text-danger text-20 line-height-07">
                                        <i className="fas fa-times-circle"></i>
                                      </p>
                                      <p className="text-danger text-8 font-weight-500 line-height-07">
                                        Failed!
                                      </p>
                                      <p className="lead">Transaction Failed</p>
                                    </div>
                                    <p className="text-3 mb-4">
                                      <span className="text-4 font-weight-500">
                                        {this.state.message}
                                      </span>{" "}
                                      , Try Again{" "}
                                      <a className="btn-link" href="/deposit">
                                        Deposit Money
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}
