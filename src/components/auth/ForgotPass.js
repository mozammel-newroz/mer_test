import React, { Component } from "react";
import Form from "react-validation/build/form";
import NumberFormat from "react-number-format";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import SecurityService from "../../services/security.service";
import Logo from "../../assets/images/logo.png";
import Cookies from "js-cookie";
import LoginImg from "../../assets/images/forgotpass.svg";
import SuccessImg from "../../assets/images/loginS.svg";
import Logo2 from "../../assets/images/logo2.svg";
import MobileView from "../MobileView";
import $ from "jquery";
import { FormattedMessage } from "react-intl";
//import AuthService from "../../services/auth.service";
import Language from "../Language";

export default class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.handleForgotPass = this.handleForgotPass.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangePassConfirmation = this.onChangePassConfirmation.bind(this);
    this.onChangeOtp = this.onChangeOtp.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      loading: false,
      message: "",
      expanded: false,
      otp: "",
      successful: false,
      contentStep: true,
      confirmStep: false,
      confirmPassStep: false,
      SuccessStep: false,
      amountIQD: "",
      failed: false,
    //  auth: false
    };
  }

  componentDidMount() {
    // Preloader
    $(window).on("load", function () {
      $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
      $("#preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
      $("body").delay(333);
    });

    $("body").on("click", ".toggle-password", function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") === "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

    // const user = AuthService.getCurrentUser();

    // if (user) {
    //   this.setState({
    //     auth: true,
    //   });
    //   this.props.history.push("/dashboard");
    //   window.location.reload();
    // }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePass(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangePassConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value,
    });
  }

  onChangeOtp(e) {
    this.setState({
      otp: e.target.value,
    });
  }

  handleReset(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      failed: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      SecurityService.resetPass(
        this.state.email,
        this.state.otp,
        this.state.password,
        this.state.password_confirmation
      ).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response.data.messages,
              contentStep: false,
              confirmStep: false,
              confirmPassStep: true,
              SuccessStep: false,
              loading: false,
              failed: true,
            });
          } else {
            this.setState({
              message: response.data.messages,
              contentStep: false,
              confirmStep: false,
              confirmPassStep: false,
              SuccessStep: true,
              failed: false,
            });
            Cookies.remove("Mtoken");
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.messages) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
            contentStep: false,
            confirmStep: false,
            confirmPassStep: true,
            SuccessStep: false,
            failed: true,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        failed: true,
      });
    }
  }

  handleConfirm(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      failed: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      SecurityService.forgotConfirmPass(this.state.email, this.state.otp).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response.data.messages,
              contentStep: false,
              confirmStep: true,
              confirmPassStep: false,
              SuccessStep: false,
              loading: false,
              failed: true,
            });
          } else {
            this.setState({
              message: response.data.messages,
              contentStep: false,
              confirmStep: false,
              confirmPassStep: true,
              SuccessStep: false,
              loading: false,
              failed: false,
            });
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.messages) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage,
            contentStep: false,
            confirmStep: true,
            confirmPassStep: false,
            SuccessStep: false,
            failed: true,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        failed: true,
      });
    }
  }

  handleForgotPass(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      failed: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      SecurityService.forgotPass(this.state.email).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response.data.messages,
              contentStep: true,
              confirmStep: false,
              confirmPassStep: false,
              SuccessStep: false,
              loading: false,
              failed: true,
            });
          } else {
            this.setState({
              message: response.data.messages,
              contentStep: false,
              confirmStep: true,
              confirmPassStep: false,
              SuccessStep: false,
              loading: false,
              failed: false,
            });
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.messages) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,

            contentStep: true,
            confirmStep: false,
            confirmPassStep: false,
            SuccessStep: false,
            failed: true,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        failed: true,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div id="preloader">
            <div data-loader="dual-ring"></div>
          </div>

          <header id="header">
            <div>
              <div className="header-row">
                <div className="header-column justify-content-start">
                  <div className="logo" style={{ paddingLeft: "3%" }}>
                    {" "}
                    <a className="d-flex" href="/home" title="">
                      <img src={Logo2} alt="" width={130} />
                    </a>{" "}
                  </div>
                </div>
                <Language />
              </div>
            </div>
          </header>

          <div id="main-wrapper" className="loginPage WebView">
            <div id="content">
              <div className="container py-5">
                <div className="row no-gutters h-100">
                  {this.state.SuccessStep ? (
                    <div className="col-md-6">
                      <img src={SuccessImg} alt="" style={{ width: "90%" }} />
                    </div>
                  ) : (
                    <div className="col-md-6">
                      <img src={LoginImg} alt="" style={{ width: "90%" }} />
                    </div>
                  )}

                  <div className="col-md-6 colOnMob">
                    {this.state.contentStep && (
                      <div>
                        <div className="FormGroupStyle">
                          <img src={Logo} alt="" style={{ width: "40%" }} />
                          <p
                            style={{
                              color: "#2B335E",
                              fontSize: "30px",
                              fontWeight: "bold",
                            }}
                          >
                            <FormattedMessage
                              id="kyc_page_personal_doc_type_selection_title"
                              defaultMessage="Verify your identity"
                            />
                          </p>
                        </div>
                        <Form
                          id="loginForm"
                          onSubmit={this.handleForgotPass}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          {!this.state.successful && (
                            <div>
                              <div className="form-group FormGroupStyle">
                                <label
                                  htmlFor="emailAddress"
                                  style={{
                                    fontSize: "18px",
                                    marginBottom: "20px",
                                  }}
                                >
                                  <FormattedMessage
                                    id="enter-email"
                                    defaultMessage="Please enter your email address"
                                  />
                                </label>
                                <Input
                                  type="email"
                                  name="email"
                                  placeholder="Enter Your Email Address"
                                  className="form-control InputStyle"
                                  style={{ paddingLeft: "20px" }}
                                  value={this.state.email}
                                  onChange={this.onChangeEmail}
                                  required
                                  id="email"
                                />
                                <span className="far fa-envelope field-icons"></span>
                              </div>

                              <div
                                className="FormGroupStyle"
                                style={{ paddingTop: "1px" }}
                              >
                                <button
                                  className="btn btn-primary btn-block my-4"
                                  style={{ borderRadius: "50px" }}
                                  type="submit"
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
                    )}

                    {this.state.confirmStep && (
                      <div>
                        <div className="FormGroupStyle">
                          <img src={Logo} alt="" style={{ width: "40%" }} />
                          <p
                            style={{
                              color: "#2B335E",
                              fontSize: "30px",
                              fontWeight: "bold",
                            }}
                          >
                            <FormattedMessage
                              id="kyc_page_personal_doc_type_selection_title"
                              defaultMessage="Verify your identity"
                            />
                          </p>
                        </div>
                        <Form
                          id="form-confirm"
                          onSubmit={this.handleConfirm}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          {!this.state.successful && (
                            <div>
                              <div className="form-group FormGroupStyle">
                                <small
                                  htmlFor="otp"
                                  style={{ fontSize: "21px" }}
                                >
                                  <FormattedMessage
                                    id="six-digits-verification"
                                    defaultMessage="We have sent 6 digits verification code to
                                  your mobile number."
                                  />
                                </small>
                                <div id="divOuter">
                                  <div id="divInner">
                                    <NumberFormat
                                      //  placeholder="Enter Your OTP"
                                      name="otp"
                                      className="form-control InputStyle"
                                      style={{
                                        marginTop: "20px",
                                        paddingLeft: "20px",
                                      }}
                                      value={this.state.otp}
                                      onChange={this.onChangeOtp}
                                      required
                                      autoComplete="true"
                                      data-bv-field="otp"
                                      id="partitioned"
                                      mask="_"
                                      maxLength="6"
                                      type="password"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div
                                className="FormGroupStyle"
                                style={{ paddingTop: "1px" }}
                              >
                                <button
                                  className="btn btn-primary btn-block my-4"
                                  style={{ borderRadius: "50px" }}
                                  disabled={this.state.loading}
                                >
                                  {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  )}
                                  <FormattedMessage
                                    id="Continue"
                                    defaultMessage="Continue"
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
                    )}

                    {this.state.confirmPassStep && (
                      <div>
                        <div className="FormGroupStyle">
                          <img src={Logo} alt="" style={{ width: "40%" }} />
                          <p
                            style={{
                              color: "#2B335E",
                              fontSize: "29px",
                              fontWeight: "500",
                            }}
                          >
                            <FormattedMessage
                              id="Reset-your-password"
                              defaultMessage="Reset your password"
                            />
                          </p>
                        </div>

                        <Form
                          onSubmit={this.handleReset}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          {!this.state.successful && (
                            <div>
                              <div className="form-group FormGroupStyle">
                                <Input
                                  type="password"
                                  name="password-new"
                                  autoComplete=""
                                  placeholder="Enter New Password"
                                  className="form-control InputStyle"
                                  style={{ paddingLeft: "20px" }}
                                  value={this.state.password}
                                  onChange={this.onChangePass}
                                  required
                                  id="password-new"
                                />
                                <span className="fas fa-lock field-icons"></span>
                                <span
                                  toggle="#password-new"
                                  className="fa fa-fw fa fa-eye field-icon toggle-password"
                                ></span>
                              </div>

                              <div className="form-group FormGroupStyle">
                                <Input
                                  type="password"
                                  name="password_confirmation1"
                                  autoComplete=""
                                  placeholder="Re-Write New Password"
                                  className="form-control InputStyle"
                                  style={{ paddingLeft: "20px" }}
                                  value={this.state.password_confirmation}
                                  onChange={this.onChangePassConfirmation}
                                  required
                                  id="password_confirmation"
                                />
                                <span className="fas fa-lock field-icons"></span>
                                <span
                                  toggle="#password_confirmation"
                                  className="fa fa-fw fa fa-eye field-icon toggle-password"
                                ></span>
                              </div>

                              <div
                                className="FormGroupStyle"
                                style={{ paddingTop: "1px" }}
                              >
                                <button
                                  className="btn btn-primary btn-block my-4"
                                  style={{ borderRadius: "50px" }}
                                  disabled={this.state.loading}
                                >
                                  {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  )}
                                  <FormattedMessage
                                    id="reset_pass_title"
                                    defaultMessage="RESET PASSWORD"
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
                    )}

                    {this.state.message && (
                      <div>
                        {this.state.SuccessStep && (
                          <div id="success">
                            <div>
                              <div className="FormGroupStyle">
                                <img
                                  src={Logo}
                                  alt=""
                                  style={{ width: "40%" }}
                                />
                                <p
                                  style={{
                                    color: "#2B335E",
                                    fontSize: "27px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <FormattedMessage
                                    id="Reset-Password-Successful"
                                    defaultMessage="Reset Password Successful"
                                  />
                                </p>
                              </div>

                              <div
                                className="FormGroupStyle"
                                style={{ paddingTop: "1px" }}
                              >
                                <small
                                  style={{
                                    fontSize: "24px",
                                    marginBottom: "1px",
                                  }}
                                >
                                  <FormattedMessage
                                    id="reset_successfully"
                                    defaultMessage="Your password has been reset successfully."
                                  />
                                </small>

                                <a
                                  className="btn btn-primary btn-block my-4"
                                  style={{ borderRadius: "50px" }}
                                  href="/login"
                                >
                                  <FormattedMessage
                                    id="login_page_login_btn_text"
                                    defaultMessage="Login"
                                  />
                                </a>
                              </div>

                              {/* <div className="row">
                                <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
                                  <div className="bg-white text-center shadow-sm rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                                    <div className="my-4">
                                      <p className="text-success text-20 line-height-07">
                                        <i className="fas fa-check-circle"></i>
                                      </p>
                                      <p className="text-success text-8 font-weight-500 line-height-07">
                                        Success!
                                      </p>
                                    </div>
                                    <p className="text-3 mb-4">
                                      <span className="text-4 font-weight-500">
                                        {this.state.message}
                                      </span>{" "}
                                      <br />
                                      <a href="/login">Login</a>
                                    </p>
                                  </div>
                                </div>
                              </div> */}
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

          <MobileView />
        </div>
      </React.Fragment>
    );
  }
}
