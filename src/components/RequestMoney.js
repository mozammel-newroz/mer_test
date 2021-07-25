import React, { Component } from "react";
// import NumberFormat from "react-number-format";
import Form from "react-validation/build/form";
import MoneyService from "../services/alltransactions.service";
import Navbar from "../components/Navbar";
import CheckButton from "react-validation/build/button";
//import AuthService from "../services/auth.service";
import Vnavbar from "../components/Vnavbar";
import SideBar from "../components/sidebar";
import Input from "react-validation/build/input";
// import Logo from "../assets/images/logo.png";
import MobileView from "./MobileView";
import { QRNormal } from "react-qrbtf";
import Footer from "./Footer";
import $ from "jquery";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        <FormattedMessage
          id="field_required"
          defaultMessage="This field is required"
        />
        !
      </div>
    );
  }
};

export default class RequestMoney extends Component {
  constructor(props) {
    super(props);
    // this.handleSend = this.handleSend.bind(this);
    this.onChangeInvoiceId = this.onChangeInvoiceId.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    // this.onChangePin = this.onChangePin.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

    this.state = {
      invoice_number: "",
      amount: "",
      pin: "",
      successful: false,
      loading: false,
      message: "",
      recipient: "",
      mobile_number: "",
      avatar: "",
      invoice_id: "",
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
      //    pinStep: false,
      FailedStep: false,
      amountIQD: "",
      failed: false,
      qrText: "",
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

  onChangeInvoiceId(e) {
    this.setState({
      invoice_number: e.target.value,
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  // onChangePin(e) {
  //   this.setState({
  //     pin: e.target.value,
  //   });
  // }

  handleConfirm(e) {
    e.preventDefault();

    this.setState({
      message: [],
      recipient: "",
      qrText: "",
      mobile_number: "",
      avatar: "",
      successful: false,
      loading: true,
      charge: "",
      total_payable: "",

      //  pinStep: false,
      confirmStep: false,
      contentStep: true,
      failed: false,
      amountIQD: "",
    });
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      MoneyService.ReqGenerateQR(
        this.state.invoice_number,
        this.state.amount
      ).then(
        (response) => {
          if (response.data.code === 200) {
            this.setState({
              contentStep: false,
              confirmStep: true,
              //  pinStep: true,
              failed: false,
              message: response.data.messages,

              qrText: response.data.data.qrText,

              // recipient: response.data.data.summary.recipient.name,
              // mobile_number: response.data.data.summary.recipient.mobile_number,
              // avatar: response.data.data.summary.recipient.avatar,
              // amountIQD: response.data.data.summary.amount,
              // charge: response.data.data.summary.charge,
              // total_payable: response.data.data.summary.total_payable,

              successful: true,
            });
          }  else {
            this.setState({
              contentStep: true,
              confirmStep: false,
              //  pinStep: false,
              failed: true,
              message: response.data.messages,
              successful: false,
              loading: false,
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
            //  pinStep: false,
            failed: true,
            successful: false,
            loading: false,
            message: resMessage,
          });
        }
      );
    }
  }

  // handleSend(e) {
  //   e.preventDefault();

  //   this.setState({
  //     message: [],
  //     recipient: "",
  //     mobile_number: "",
  //     avatar: "",
  //     qrText: this.state.qrText,
  //     invoice_id: "",
  //     successful: false,
  //     contentStep: false,
  //     confirmStep: false,
  //     pinStep: true,
  //     FailedStep: false,
  //   });

  //   this.form.validateAll();

  //   console.log(this.state.qr_text);
  //   console.log(this.state.amount);
  //   console.log(this.state.pin);

  //   if (this.checkBtn.context._errors.length === 0) {
  //     MoneyService.ReqExecute(
  //       this.state.qr_text,
  //       this.state.amount,
  //       this.state.pin
  //     ).then(
  //       (response) => {
  //         if (response.data.code !== 200) {
  //           this.setState({
  //             message: response.data.messages,
  //             successful: false,
  //             contentStep: false,
  //             confirmStep: false,
  //             pinStep: true,
  //             FailedStep: true,
  //           });
  //         } else {
  //           this.setState({
  //             message: response.data.messages,

  //             recipient: response.data.data.summary.recipient.name,
  //             mobile_number: response.data.data.summary.recipient.mobile_number,
  //             avatar: response.data.data.summary.recipient.avatar,
  //             invoice_id: response.data.data.summary.invoice_id,

  //             successful: true,
  //             contentStep: false,
  //             confirmStep: true,
  //             FailedStep: false,
  //             pinStep: false,
  //           });
  //         }
  //       },
  //       (error) => {
  //         const resMessage =
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.messages) ||
  //           error.message ||
  //           error.toString();

  //         this.setState({
  //           contentStep: false,
  //           confirmStep: false,
  //           pinStep: true,
  //           FailedStep: true,
  //           successful: false,
  //           message: resMessage,
  //         });
  //       }
  //     );
  //   }
  // }

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
                  <div
                    className="col-lg-3 col-s-12 pt-4 asideDesktopView SideDesktopView"
                    style={{ backgroundColor: "#F0F6FA" }}
                  >
                    <SideBar />
                  </div>

                  <div className="col-lg-8 col-s-12 pt-4">
                    {this.state.contentStep && (
                      <div id="content" style={{ paddingTop: "13%" }}>
                        <div>
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
                                          id="Request_Payments"
                                          defaultMessage="Request Payments"
                                        />
                                      </h3>
                                      <div className="form-group">
                                        <h6 htmlFor="invoice_number">
                                          <FormattedMessage
                                            id="request_money_page_enter_invoice_no"
                                            defaultMessage="Enter Invoice Number"
                                          />
                                        </h6>
                                        <div>
                                          <Input
                                            placeholder="E.g. gx5746"
                                            value={this.state.invoice_number}
                                            onChange={this.onChangeInvoiceId}
                                            name="invoice_number"
                                            className="form-control MerchantInput"
                                            style={{
                                              border: "1px solid #3494E629",
                                            }}
                                            id="invoice_number"
                                            data-bv-field="invoice_number"
                                            validations={[required]}
                                            required
                                          />
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <h6 htmlFor="amount">
                                          <FormattedMessage
                                            id="request_money_page_how_much_money_receive"
                                            defaultMessage="How much money you would like to receive?"
                                          />
                                        </h6>
                                        <div className="input-group">
                                          <div className="input-group-prepend MerchantInput">
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
                                                (floatValue <= 99999999999 &&
                                                  floatValue >= 0)
                                              );
                                            }}
                                            placeholder="Amount"
                                            value={this.state.amount}
                                            onChange={this.onChangeAmount}
                                            name="amount"
                                            className="form-control MerchantInput"
                                            style={{borderLeft: 'none'}}
                                            id="amount"
                                            data-bv-field="amount"
                                            validations={[required]}
                                            required
                                            thousandSeparator={true}
                                            mask="_"
                                          /> */}
                                        </div>
                                      </div>

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
                                            id="request_money_page_generate_qr_code"
                                            defaultMessage="Generate QR CODE"
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

                    {/* {this.state.pinStep && (
                      <div id="pinStep" style={{ paddingTop: "13%" }}>
                        <div>
                          <div className="row">
                            <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <Form
                                  id="form-send-money2"
                                  onSubmit={this.handleSend}
                                  ref={(c) => {
                                    this.form = c;
                                  }}
                                >
                                  {this.state.successful && (
                                    <div>
                                      <h3 className="text-5 font-weight-600 text-center mt-3">
                                        Request Payment
                                      </h3>
                                      <div className="form-group">
                                        <label>Enter 4-digits PIN</label>
                                        <div>
                                          <NumberFormat
                                            placeholder="Enter 4-digits PIN"
                                            name="pin"
                                            className="form-control"
                                            style={{ borderRadius: "16px" }}
                                            value={this.state.pin}
                                            onChange={this.onChangePin}
                                            required
                                            validations={[required]}
                                            data-bv-field="pin"
                                            id="pin"
                                            mask="_"
                                            maxLength="4"
                                            type="password"
                                          />
                                        </div>
                                      </div>
                                      <div className="text-center">
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                          style={{
                                            borderRadius: "50px",
                                            width: "90%",
                                          }}
                                        >
                                          Confirm
                                        </button>
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
                                    </div>
                                  )}
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )} */}

                    {this.state.confirmStep && (
                      <div id="confirm" style={{ paddingTop: "13%" }}>
                        <div>
                          <div className="row">
                            <div className="col-md-8 col-lg-12 mx-auto">
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <Form
                                  id="form-send-money"
                                  //  onSubmit={this.handleSend}
                                  ref={(c) => {
                                    this.form = c;
                                  }}
                                >
                                  {this.state.successful && (
                                    <div>
                                      <h3 className="text-5 font-weight-600 text-center mt-3">
                                        <FormattedMessage
                                          id="Request_Payments"
                                          defaultMessage="Request Payment"
                                        />
                                      </h3>

                                      <div
                                        className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                        style={{ borderRadius: "16px" }}
                                      >
                                        <div className="row">
                                          <div
                                            className="col-md-6"
                                            style={{
                                              textAlign: "-webkit-center",
                                            }}
                                          >
                                            <p
                                              htmlFor="requestee_mobile_number"
                                              style={{
                                                color: "#2D335B",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                              }}
                                            >
                                              <FormattedMessage
                                                id="QR_Code"
                                                defaultMessage="QR Code"
                                              />
                                            </p>
                                            <div className="divQR2">
                                              <QRNormal
                                                value={this.state.qrText}
                                              />
                                              <br />
                                              {/* <img src={Logo} alt="" width={50} /> */}
                                            </div>
                                          </div>

                                          <div className="col-md-6">
                                            <p
                                              htmlFor="requestee_mobile_number"
                                              style={{
                                                color: "#2D335B",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                              }}
                                            >
                                              <FormattedMessage
                                                id="receive_payment_qr_page_qr_code_details"
                                                defaultMessage="QR Code Details"
                                              />
                                            </p>
                                            <div
                                              className="form-group"
                                              style={{ display: "inline-flex" }}
                                            >
                                              {localStorage.getItem(
                                                "MprofileImg"
                                              ) ? (
                                                <div>
                                                  <img
                                                    className="rounded-circle summaryAvater"
                                                    style={{
                                                      border:
                                                        "1px solid #FC2861",
                                                    }}
                                                    width={50}
                                                    src={localStorage.getItem(
                                                      "MprofileImg"
                                                    )}
                                                    alt=""
                                                  />
                                                </div>
                                              ) : (
                                                <div></div>
                                              )}

                                              <div
                                                style={{
                                                  marginLeft: "10px",
                                                  fontSize: "16px",
                                                  textTransform: "capitalize",
                                                }}
                                              >
                                                <p
                                                  style={{
                                                    marginBottom: 0,
                                                    color: "#595C80",
                                                  }}
                                                >
                                                  {localStorage.getItem(
                                                    "MfirstName"
                                                  )}{" "}
                                                  {localStorage.getItem(
                                                    "MlasttName"
                                                  )}
                                                </p>
                                                <p>
                                                  {localStorage.getItem(
                                                    "MmobileNo"
                                                  )}
                                                </p>
                                              </div>
                                            </div>

                                            <p
                                              className="text-3 font-weight-600"
                                              style={{ color: "#2D335B" }}
                                            >
                                              <FormattedMessage
                                                id="home_page_invoice_no"
                                                defaultMessage="Invoice No"
                                              />
                                              <br />{" "}
                                              <span
                                                className="font-weight-500"
                                                style={{ color: "#595C80" }}
                                              >
                                                {this.state.invoice_number}
                                              </span>
                                            </p>

                                            <p
                                              className="text-3 font-weight-600 mb-1"
                                              style={{ color: "#2D335B" }}
                                            >
                                              <FormattedMessage
                                                id="Total_Payable"
                                                defaultMessage="Total Payable"
                                              />
                                              <br />{" "}
                                              <span
                                                className="text-6"
                                                style={{ color: "#FC2861" }}
                                              >
                                                {this.state.amount} IQD
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div
                                        style={{
                                          textAlign: "center",
                                          paddingTop: "20px",
                                        }}
                                      >
                                        <a
                                          href="#"
                                          className="btn btn-primary"
                                          style={{
                                            borderRadius: "50px",
                                            width: "70%",
                                          }}
                                        >
                                          <FormattedMessage
                                            id="share_qr_code"
                                            defaultMessage="Share"
                                          />
                                        </a>
                                      </div> */}
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
                        {this.state.FailedStep && (
                          <div id="fail" style={{ paddingTop: "13%" }}>
                            <div>
                              <div className="row">
                                <div className="col-md-9 col-lg-8 col-xl-6 mx-auto">
                                  <div
                                    className="bg-white text-center shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                    style={{ borderRadius: "16px" }}
                                  >
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
                                        />{" "}
                                      </p>
                                    </div>
                                    <p className="text-3 mb-4">
                                      <span className="text-4 font-weight-500">
                                        {this.state.message}
                                      </span>
                                      <br />
                                      <FormattedMessage
                                        id="app_common_try_again"
                                        defaultMessage="Try Again"
                                      />{" "}
                                      <a
                                        className="btn-link"
                                        href="/requestpayment"
                                      >
                                        <FormattedMessage
                                          id="home_page_request_payment"
                                          defaultMessage="Request Payment"
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
