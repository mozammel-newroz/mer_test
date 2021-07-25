import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import SecurityService from "../services/security.service";
//import AuthService from "../services/auth.service";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Cookies from "js-cookie";
import $ from "jquery";
import BackImg from "../assets/images/back.svg";
import MobileView from "./MobileView";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(
      this
    );
    this.onChangeOtp = this.onChangeOtp.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      old_password: "",
      password: "",
      password_confirmation: "",
      loading: false,
      message: "",
      expanded: false,
      open: false,
      otp: "",
      failed: false,
      changeStep: true,
      successStep: false,
    };
  }

  componentDidMount() {
    // const user = AuthService.getCurrentUser();

    // if (!user) {
    //   this.props.history.push("/login");
    //   window.location.reload();
    // }

    $("body").on("click", ".toggle-password", function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") === "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }

  onChangeOldPassword(e) {
    this.setState({
      old_password: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangePasswordConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value,
    });
  }

  onChangeOtp(e) {
    this.setState({
      otp: e.target.value,
    });
  }

  handleClose(e) {
    e.preventDefault();

    this.setState({
      open: false,
    });
  }

  handleConfirm(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: false,
      old_password: "",
      password: "",
      password_confirmation: "",
      otp: "",
      failed: false,
      changeStep: true,
      successStep: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      SecurityService.confirmPassword(
        this.state.old_password,
        this.state.password,
        this.state.password_confirmation,
        this.state.otp
      ).then(
        (response) => {
          if (response.data.code === 200) {
            this.setState({
              message: response.data.messages,
              loading: false,
              changeStep: false,
              successStep: true,
            });
            Cookies.remove("Mtoken");
          } else {
            this.setState({
              message: response.data.messages,
              failed: true,
              loading: false,
              changeStep: true,
              successStep: false,
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
            loading: false,
            message: resMessage,
            changeStep: true,
            successStep: false,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        failed: true,
        changeStep: true,
        successStep: false,
      });
    }
  }

  handleUpdatePassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      open: false,
      failed: false,
      changeStep: true,
      successStep: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      SecurityService.changePassword(
        this.state.old_password,
        this.state.password,
        this.state.password_confirmation
      ).then(
        (response) => {
          if (response.data.code === 200) {
            this.setState({
              message: response.data.messages,
              open: true,
              changeStep: true,
              successStep: false,
            });
          } else {
            this.setState({
              message: response.data.messages,
              open: false,
              failed: true,
              loading: false,
              changeStep: true,
              successStep: false,
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
            loading: false,
            failed: true,
            message: resMessage,
            changeStep: true,
            successStep: false,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        changeStep: true,
        successStep: false,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div
            className="WebView"
            style={{
              textAlign: "-webkit-center",
              paddingTop: "12%",
              backgroundColor: "#BEBEC2",
              height: "937px",
            }}
          >
            <Card className="ChangePassCard">
              <CardContent style={{ padding: "40px" }}>
                {this.state.changeStep && (
                  <Form
                    onSubmit={this.handleUpdatePassword}
                    ref={(c) => {
                      this.form = c;
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: "15px",
                        textAlign: "justify",
                        paddingRight: "15px",
                        paddingBottom: "10px",
                      }}
                    >
                      <a href="/dashboard" style={{ color: "#707070" }}>
                        <div className="back-Btn">
                          <img src={BackImg} alt="" />
                        </div>
                      </a>
                      <h4 className="passHeader">
                        <FormattedMessage
                          id="Reset-your-password"
                          defaultMessage="Reset your password"
                        />
                      </h4>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-12">
                      <Input
                        type="password"
                        required
                        name="old_password"
                        placeholder="Old password"
                        className="form-control InputStyle"
                        value={this.state.old_password}
                        onChange={this.onChangeOldPassword}
                        id="old_password"
                        style={{ paddingRight: "60px" }}
                      />
                      <span className="fas fa-lock field-icons"></span>
                      <span
                        toggle="#old_password"
                        className="fa fa-fw fa fa-eye field-icon toggle-password"
                      ></span>
                    </div>

                    <div
                      className="col-12 col-sm-12 col-lg-12"
                      style={{ marginTop: "5%" }}
                    >
                      <Input
                        type="password"
                        required
                        name="password"
                        placeholder="Enter new password"
                        className="form-control InputStyle"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        id="password-field"
                        style={{ paddingRight: "60px" }}
                      />
                      <span className="fas fa-lock field-icons"></span>
                      <span
                        toggle="#password-field"
                        className="fa fa-fw fa fa-eye field-icon toggle-password"
                      ></span>
                    </div>

                    <div
                      className="col-12 col-sm-12 col-lg-12"
                      style={{ marginTop: "5%" }}
                    >
                      <Input
                        type="password"
                        name="password_confirmation"
                        required
                        placeholder="Confirm password"
                        className="form-control InputStyle"
                        value={this.state.password_confirmation}
                        onChange={this.onChangePasswordConfirmation}
                        id="password_confirmation"
                        style={{ paddingRight: "60px" }}
                      />
                      <span className="fas fa-lock field-icons"></span>
                      <span
                        toggle="#password_confirmation"
                        className="fa fa-fw fa fa-eye field-icon toggle-password"
                      ></span>
                      <div style={{ paddingTop: "35px" }}>
                        <button
                          className="btn btn-primary btn-block my-4"
                          style={{ borderRadius: "50px", width: "73%" }}
                          disabled={this.state.loading}
                        >
                          {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <FormattedMessage
                            id="app_common_confirm"
                            defaultMessage="Confirm"
                          />
                        </button>
                      </div>
                      {this.state.failed && (
                        <h2
                          style={{
                            color: "#fc2861",
                            padding: "15px",
                            textAlign: "center",
                            fontSize: "17px",
                          }}
                        >
                          {this.state.message}
                        </h2>
                      )}
                    </div>

                    {!this.state.failed && (
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        open={this.state.open}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={this.state.open}>
                          <div className="row">
                            <div className="col-12 col-sm-12 col-lg-12">
                              <Card style={{ padding: "37px 27px" }}>
                                <div>
                                  <div
                                    className="col-12 col-sm-12 col-lg-12"
                                    style={{ marginTop: "5%" }}
                                  >
                                    <p
                                      style={{
                                        fontSize: "17px",
                                      }}
                                    >
                                      <FormattedMessage
                                        id="reg_page_otp_verification_title"
                                        defaultMessage="Enter The OTP"
                                      />
                                      :
                                    </p>
                                    <NumberFormat
                                      type="password"
                                      name="otp"
                                      placeholder="OTP"
                                      className="form-control MerchantInput"
                                      style={{ marginBottom: "10px" }}
                                      value={this.state.otp}
                                      onChange={this.onChangeOtp}
                                      required
                                      id="otp"
                                      autoComplete="true"
                                      mask="_"
                                      maxLength="6"
                                    />
                                    <button
                                      style={{
                                        marginTop: "35px",
                                        borderRadius: "50px",
                                      }}
                                      className="btn btn-primary btn-block"
                                      onClick={this.handleConfirm}
                                    >
                                      <FormattedMessage
                                        id="app_common_confirm"
                                        defaultMessage="Confirm"
                                      />
                                    </button>
                                  </div>
                                  {this.state.failed && (
                                    <h2
                                      style={{
                                        color: "#fc2861",
                                        padding: "15px",
                                        textAlign: "center",
                                        fontSize: "17px",
                                      }}
                                    >
                                      {this.state.message}
                                    </h2>
                                  )}
                                </div>
                              </Card>
                            </div>
                          </div>
                        </Fade>
                      </Modal>
                    )}
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                  </Form>
                )}

                {this.state.successStep && (
                  <div>
                    {!this.state.failed && (
                      <div style={{ textAlign: "center" }}>
                        <div id="fail" className="py-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="my-4">
                                  <p className="text-success text-20 line-height-07">
                                    <i className="fas fa-check-circle"></i>
                                  </p>
                                  <p
                                    className="text-success text-8 font-weight-500 line-height-07"
                                    style={{ padding: "50px 0" }}
                                  >
                                    <FormattedMessage
                                      id="Password_Update_successfully"
                                      defaultMessage="Password Update successfully"
                                    />
                                  </p>
                                </div>
                                <div style={{ textAlign: "-webkit-center" }}>
                                  <a
                                    className="btn btn-primary btn-block my-4"
                                    style={{
                                      borderRadius: "50px",
                                      width: "66%",
                                    }}
                                    href="/login"
                                  >
                                    <FormattedMessage
                                      id="login_page_login_btn_text"
                                      defaultMessage="Login"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <MobileView />
        </div>
      </React.Fragment>
    );
  }
}
