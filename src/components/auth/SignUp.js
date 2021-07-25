import React, { Component } from "react";
//import { NavLink } from "react-router-dom";
import NumberFormat from "react-number-format";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
// import $ from "jquery";
import Logo from "../../assets/images/logo.png";
import LoginImg from "../../assets/images/loginS.svg";
import appStore from "../../assets/images/appstore.svg";
import googlePlayStore from "../../assets/images/google.svg";
import firebase from "../../firebaseConfig";
import "firebase/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleCredentials = this.handleCredentials.bind(this);
    this.handleEmailOTP = this.handleEmailOTP.bind(this);
    this.handleMobileOTP = this.handleMobileOTP.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);

    this.onChangeMobileNo = this.onChangeMobileNo.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeConfirmation = this.onChangeConfirmation.bind(this);
    this.onChangeEmailOtp = this.onChangeEmailOtp.bind(this);
    this.onChangeOtp = this.onChangeOtp.bind(this);

    this.state = {
      mobile_number: "",
      password: "",
      otp: "",
      message: "",
      loading: false,
      existenceStep: true,
      verifyMobileStep: false,
      credentialsStep: false,
      verifyStep: false,
      completionStep: false,
      failed: false,
      uid: "",
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.props.history.push("/dashboard");
      window.location.reload();
    }
  }

  //  handleClick() {
  //   var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha11", {
  //     size: "invisible",
  //     callback: (response) => {
  //       // reCAPTCHA solved, allow signInWithPhoneNumber.
  //       // onSignInSubmit();
  //     },
  //   });
  //   //  var number = "+9647705332365";
  //   var number = this.state.mobile_number;

  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(number, recaptcha)
  //     .then(function (e) {
  //       // setUnverifiedAccount(false);
  //       // setVerifyYourAccount(true);

  //       if (this.state.otp === null) return;

  //       e.confirm(this.state.otp)
  //         .then(function (result) {
  //              console.log(result.user.phoneNumber);
  //              console.log(result.user.uid);

  //           // setUnverifiedAccount(false);
  //           // setVerifyYourAccount(false);
  //           // setCompleteVerification(true);

  //         })
  //         .catch(function (error) {
  //      //     setUnverifiedAccount(false);
  //      //     setVerifyYourAccount(true);
  //      //     setCompleteVerification(false);
  //       //    setError(true);
  //       //    setErrorMsgBody(error);
  //           console.log(error);
  //         });
  //     })
  //     .catch(function (error) {
  //   //    setUnverifiedAccount(false);
  //   //    setVerifyYourAccount(true);
  //    //   setCompleteVerification(false);
  //  //     setError(true);
  //  //     setErrorMsgBody(error);
  //       console.log(error);
  //     });
  // };

  logOut() {
    AuthService.logout();
  }

  onChangeMobileNo(e) {
    this.setState({
      mobile_number: e.target.value,
    });
  }

  onChangeFirstname(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

  onChangeLastname(e) {
    this.setState({
      last_name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeEmailOtp(e) {
    this.setState({
      email_otp: e.target.value,
    });
  }

  onChangeOtp(e) {
    this.setState({
      otp: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmation(e) {
    this.setState({
      password_confirmation: e.target.value,
    });
  }

  handleSignup(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      existenceStep: true,
      verifyMobileStep: false,
      credentialsStep: false,
      verifyStep: false,
      completionStep: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.regExistence(this.state.mobile_number).then(
        (response) => {
          if (response.data.code === 200) {
            this.setState({
              existenceStep: false,
              verifyMobileStep: true,
              credentialsStep: false,
              verifyStep: false,
              completionStep: false,
            });

            /////////
            var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha1", {
              size: "invisible",
              callback: (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
              },
            });
            //  var number = "+9647705332365";
            var number = this.state.mobile_number;

            firebase
              .auth()
              .signInWithPhoneNumber(number, recaptcha)
              .then(function (e) {
                // setUnverifiedAccount(false);
                // setVerifyYourAccount(true);

                if (this.state.otp === null) return;

                e.confirm(this.state.otp)
                  .then(function (result) {
                    console.log(result.user.phoneNumber);
                    console.log(result.user.uid);

                    // setUnverifiedAccount(false);
                    // setVerifyYourAccount(false);
                    // setCompleteVerification(true);
                  })
                  .catch(function (error) {
                    //     setUnverifiedAccount(false);
                    //     setVerifyYourAccount(true);
                    //     setCompleteVerification(false);
                    //    setError(true);
                    //    setErrorMsgBody(error);
                    console.log(error);
                  });
              })
              .catch(function (error) {
                //    setUnverifiedAccount(false);
                //    setVerifyYourAccount(true);
                //   setCompleteVerification(false);
                //     setError(true);
                //     setErrorMsgBody(error);
                console.log(error);
              });
            ///////////////////////////
          } else {
            this.setState({
              loading: false,
              message: response.data.messages,
              existenceStep: true,
              verifyMobileStep: false,
              credentialsStep: false,
              verifyStep: false,
              completionStep: false,
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
            existenceStep: true,
            verifyMobileStep: false,
            credentialsStep: false,
            verifyStep: false,
            completionStep: false,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        existenceStep: true,
        verifyMobileStep: false,
        credentialsStep: false,
        verifyStep: false,
        completionStep: false,
      });
    }
  }

  handleCredentials(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      existenceStep: false,
      verifyMobileStep: false,
      credentialsStep: true,
      verifyStep: false,
      completionStep: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.regCredentials(
        this.state.mobile_number,
        this.state.first_name,
        this.state.last_name,
        this.state.email,
        this.state.password,
        this.state.password_confirmation
      ).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response.data.messages,
              existenceStep: false,
              verifyMobileStep: false,
              credentialsStep: true,
              verifyStep: false,
              completionStep: false,
              loading: false,
            });
          } else {
            this.setState({
              message: response.data.messages,
              existenceStep: false,
              verifyMobileStep: false,
              credentialsStep: false,
              verifyStep: true,
              completionStep: false,
              loading: false,
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
            existenceStep: false,
            verifyMobileStep: false,
            credentialsStep: true,
            verifyStep: false,
            completionStep: false,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleEmailOTP(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      existenceStep: false,
      verifyMobileStep: false,
      credentialsStep: false,
      verifyStep: true,
      completionStep: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.regVerify(
        this.state.mobile_number,
        this.state.first_name,
        this.state.last_name,
        this.state.email,
        this.state.password,
        this.state.password_confirmation,
        this.state.email_otp
      ).then(
        (response) => {
          if (response.data.code === 200) {
            this.setState({
              existenceStep: false,
              verifyMobileStep: false,
              credentialsStep: false,
              verifyStep: false,
              completionStep: true,
            });
          } else {
            this.setState({
              loading: false,
              message: response.data.messages,
              existenceStep: false,
              verifyMobileStep: false,
              credentialsStep: false,
              verifyStep: true,
              completionStep: false,
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
            existenceStep: false,
            verifyMobileStep: false,
            credentialsStep: false,
            verifyStep: true,
            completionStep: false,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
        existenceStep: false,
        verifyMobileStep: false,
        credentialsStep: false,
        verifyStep: true,
        completionStep: false,
      });
    }
  }

  handleMobileOTP(e) {
    e.preventDefault();

    // var text = "";
    // var possible =
    //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // for (var i = 0; i < 20; i++)
    //   text =
    //     text + possible.charAt(Math.floor(Math.random() * possible.length));

    this.setState({
      message: "",
      loading: true,
      existenceStep: false,
      verifyMobileStep: true,
      credentialsStep: false,
      verifyStep: false,
      completionStep: false,
      //    uid: text,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.firebaseAuthInfo(
        this.state.mobile_number,
        this.state.otp
      ).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response.data.messages,
              existenceStep: false,
              verifyMobileStep: true,
              credentialsStep: false,
              verifyStep: false,
              completionStep: false,
              loading: false,
            });
          } else {
            this.setState({
              message: response.data.messages,
              existenceStep: false,
              verifyMobileStep: false,
              credentialsStep: true,
              verifyStep: false,
              completionStep: false,
              loading: false,
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
            existenceStep: false,
            verifyMobileStep: true,
            credentialsStep: false,
            verifyStep: false,
            completionStep: true,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  handleCompletion(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
      existenceStep: false,
      verifyMobileStep: false,
      credentialsStep: false,
      verifyStep: false,
      completionStep: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.regCompletion(
        this.state.mobile_number,
        this.state.first_name,
        this.state.last_name,
        this.state.email,
        this.state.password,
        this.state.password_confirmation,
        this.state.email_otp,
        1,
        this.state.otp
      ).then(
        (response) => {
          if (response.data.code !== 200) {
            this.setState({
              message: response.data.messages,
              existenceStep: false,
              verifyMobileStep: false,
              credentialsStep: false,
              verifyStep: false,
              completionStep: true,
              loading: false,
            });
          } else {
            this.props.history.push("/login");
            window.location.reload();
            this.setState({
              message: response.data.messages,
              existenceStep: false,
              verifyMobileStep: false,
              credentialsStep: false,
              verifyStep: false,
              completionStep: false,
              loading: false,
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
            existenceStep: false,
            verifyMobileStep: false,
            credentialsStep: false,
            verifyStep: false,
            completionStep: true,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <div id="main-wrapper" className="loginPage WebView">
            <div id="content">
              <div className="container py-5">
                <div className="row no-gutters h-100">
                  <div className="col-md-6">
                    <img src={LoginImg} alt="" style={{ width: "90%" }} />
                  </div>

                  <div className="col-md-6 colOnMob">
                    {this.state.existenceStep && (
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
                            {" "}
                            {this.state.makeidd}
                            Become a Merchant
                          </p>
                        </div>
                        <Form
                          onSubmit={this.handleSignup}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          <div className="form-group FormGroupStyle">
                            <label
                              style={{
                                fontSize: "18px",
                                marginBottom: "20px",
                              }}
                            >
                              Please enter your mobile number
                            </label>
                            <NumberFormat
                              placeholder="Enter Your Mobile Number"
                              value={this.state.mobile_number}
                              onChange={this.onChangeMobileNo}
                              name="mobile-no"
                              className="form-control InputStyle"
                              id="mobile-no"
                              data-bv-field="mobile-no"
                              validations={[required]}
                              required
                              format="+964 ### ### ####"
                              mask="_"
                            />
                          </div>

                          <div
                            className="FormGroupStyle"
                            style={{ paddingTop: "1px" }}
                          >
                            <button
                              id="recaptcha1"
                              className="btn btn-primary btn-block my-4"
                              style={{ borderRadius: "50px" }}
                              type="submit"
                              disabled={this.state.loading}
                            >
                              {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                              )}
                              Continue
                            </button>
                          </div>
                          {this.state.message && (
                            <div className="FormGroupStyle">
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

                    {this.state.verifyMobileStep && (
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
                            Verify your identity.
                          </p>
                        </div>
                        <Form
                          onSubmit={this.handleMobileOTP}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >

                          <div
                            className="form-group FormGroupStyle"
                            style={{ overflow: "hidden" }}
                          >
                            <label
                              style={{
                                fontSize: "18px",
                                marginBottom: "20px",
                              }}
                            >
                              We have sent 6 digits verification code to your
                              mobile.
                            </label>
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
                                  autoFocus
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className="FormGroupStyle"
                            //   style={{ paddingTop: "1px" }}
                          >
                            <button
                              className="btn btn-primary btn-block my-4"
                              style={{ borderRadius: "50px" }}
                              type="submit"
                            >
                              Continue
                            </button>
                            <div className="text-center" id="recaptcha1">
                              {/* <p  id="recaptcha11" onClick={this.handleClick} style={{color: "#03EBA3", cursor: "pointer"}}>Resend Code</p> */}
                            </div>
                          </div>
                          {this.state.message && (
                            <div className="FormGroupStyle">
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

                    {this.state.credentialsStep && (
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
                            Enter Profile Information
                          </p>
                        </div>
                        <Form
                          onSubmit={this.handleCredentials}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          <div className="form-group FormGroupStyle">
                            <label
                              style={{
                                fontSize: "18px",
                                marginBottom: "20px",
                              }}
                            >
                              Please make sure all the information are correct
                              and match your personal ID
                            </label>
                            <Input
                              placeholder="Owner First Name"
                              value={this.state.first_name}
                              onChange={this.onChangeFirstname}
                              name="first_name"
                              className="form-control MerchantInput"
                              style={{ marginBottom: "10px" }}
                              id="first_name"
                              data-bv-field="first_name"
                              validations={[required]}
                              required
                            />
                            <Input
                              placeholder="Owner Last Name"
                              value={this.state.last_name}
                              onChange={this.onChangeLastname}
                              name="last_name"
                              className="form-control MerchantInput"
                              style={{ marginBottom: "10px" }}
                              id="last_name"
                              data-bv-field="last_name"
                              validations={[required]}
                              required
                            />
                            <Input
                              placeholder="Business E-mail address"
                              value={this.state.email}
                              onChange={this.onChangeEmail}
                              name="email"
                              className="form-control MerchantInput"
                              style={{ marginBottom: "10px" }}
                              id="email"
                              data-bv-field="email"
                              validations={[required]}
                              required
                            />
                            <Input
                              placeholder="Enter Password"
                              value={this.state.password}
                              onChange={this.onChangePassword}
                              name="password"
                              type="password"
                              className="form-control MerchantInput"
                              style={{ marginBottom: "10px" }}
                              id="password"
                              data-bv-field="password"
                              validations={[required]}
                              required
                            />
                            <Input
                              placeholder="Re-write Password"
                              value={this.state.password_confirmation}
                              onChange={this.onChangeConfirmation}
                              name="password_confirmation"
                              type="password"
                              className="form-control MerchantInput"
                              style={{ marginBottom: "10px" }}
                              id="password_confirmation"
                              data-bv-field="password_confirmation"
                              validations={[required]}
                              required
                            />
                          </div>

                          <div
                            className="FormGroupStyle"
                            style={{ paddingTop: "1px" }}
                          >
                            <button
                              className="btn btn-primary btn-block my-4"
                              style={{ borderRadius: "50px" }}
                              type="submit"
                            >
                              Next
                            </button>
                          </div>
                          {this.state.message && (
                            <div className="FormGroupStyle">
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

                    {this.state.verifyStep && (
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
                            Verify your identity.
                          </p>
                        </div>
                        <Form
                          onSubmit={this.handleEmailOTP}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          <div className="form-group FormGroupStyle">
                            <label
                              style={{
                                fontSize: "18px",
                                marginBottom: "20px",
                              }}
                            >
                              We have sent 6 digits verification code to your
                              email address.
                            </label>
                            <NumberFormat
                              placeholder="Enter Email OTP"
                              name="email_otp"
                              className="form-control InputStyle"
                              value={this.state.email_otp}
                              onChange={this.onChangeEmailOtp}
                              required
                              validations={[required]}
                              data-bv-field="email_otp"
                              id="email_otp"
                              mask="_"
                              maxLength="6"
                              type="password"
                            />
                          </div>

                          <div
                            className="FormGroupStyle"
                            style={{ paddingTop: "1px" }}
                          >
                            <button
                              className="btn btn-primary btn-block my-4"
                              style={{ borderRadius: "50px" }}
                              type="submit"
                            >
                              Continue
                            </button>
                          </div>
                          {this.state.message && (
                            <div className="FormGroupStyle">
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

                    {this.state.completionStep && (
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
                            Terms & conditions
                          </p>
                        </div>
                        <Form
                          onSubmit={this.handleCompletion}
                          ref={(c) => {
                            this.form = c;
                          }}
                        >
                          <div
                            className="form-group FormGroupStyle"
                            style={{
                              height: "400px",
                              overflow: "hidden",
                              overflowY: "scroll",
                            }}
                          >
                            <label
                              style={{
                                fontSize: "14px",
                                marginBottom: "20px",
                              }}
                            >
                              Lorem ipsum dolor sit amet, consetetur sadipscing
                              elitr, sed diam nonumy eirmod tempor invidunt ut
                              labore et dolore magna aliquyam erat, sed diam
                              voluptua. At vero eos et accusam et justo duo
                              dolores et ea rebum. Stet clita kasd gubergren, no
                              sea takimata sanctus est Lorem ipsum dolor sit
                              amet. Lorem ipsum dolor sit amet, consetetur
                              sadipscing elitr, sed diam nonumy eirmod tempor
                              invidunt ut labore et dolore magna aliquyam erat,
                              sed diam voluptua. At vero eos et accusam et justo
                              duo dolores et ea rebum. Stet clita kasd
                              gubergren, no sea takimata sanctus est Lorem ipsum
                              dolor sit amet. Lorem ipsum dolor sit amet,
                              consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et ea rebum. Stet
                              clita kasd gubergren, no sea takimata sanctus est
                              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                              amet, consetetur sadipscing elitr, sed diam nonumy
                              eirmod tempor invidunt ut labore et dolore magna
                              aliquyam erat, sed diam voluptua. At vero eos et
                              accusam et justo duo dolores et.
                            </label>
                          </div>

                          <div
                            className="form-group FormGroupStyle"
                            style={{
                              display: "flex",
                              paddingTop: "10%",
                            }}
                          >
                            <a
                              href="/signup"
                              className="btn"
                              style={{
                                borderRadius: "50px",
                                marginRight: "auto",
                                width: "45%",
                              }}
                            >
                              Decline
                            </a>
                            <button
                              className="btn btn-primary"
                              style={{
                                borderRadius: "50px",
                                width: "45%",
                              }}
                              type="submit"
                            >
                              I agree
                            </button>
                          </div>

                          {this.state.message && (
                            <div className="FormGroupStyle">
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="MobileView">
            <div id="content">
              <div className="container py-5">
                <div className="row">
                  <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
                    <div className="text-center">
                      <a
                        href="https://www.fast-pay.cash/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={Logo} alt="" width={250} />
                      </a>
                    </div>
                    <br />
                    <section className="section py-5">
                      <div className="container">
                        <div className="justify-content-center text-center">
                          <h2 className="text-9">Get the app</h2>
                          <p className="lead mb-4">
                            Download our app for the fastest, most convenient
                            way to send & get Payment.
                          </p>
                          <a
                            className="d-inline-flex mx-3"
                            href="https://apps.apple.com/in/app/fastpay-wallet/id1255784969"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              alt=""
                              width="168"
                              height="49"
                              src={appStore}
                            />
                          </a>
                          <a
                            className="d-inline-flex mx-3"
                            href="https://play.google.com/store/apps/details?id=com.sslwireless.fastpay"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              alt=""
                              width="166"
                              height="49"
                              src={googlePlayStore}
                            />
                          </a>{" "}
                        </div>
                      </div>
                    </section>
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
