import React, { Component } from "react";
import NumberFormat from "react-number-format";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import $ from "jquery";
import Cookies from "js-cookie";
import Logo from "../../assets/images/logo.png";
import Logo2 from "../../assets/images/logo2.svg";
import LoginImg from "../../assets/images/loginS.svg";
import MobileView from "../MobileView";
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormattedMessage } from "react-intl";
import Language from "../Language";

export default class Login extends Component {
  constructor(props) {
    super(props);

    // this.logOut = this.logOut.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      username: "",
      password: "",
      message: "",
      loading: false,
      remember: false,
    };
  }

  componentDidMount() {
    // Preloader
    $(window).on("load", function () {
      $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
      $("#preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
      $("body").delay(333);
    });

    const user = AuthService.getCurrentUser();

    if (user) {
      this.props.history.push("/dashboard");
      window.location.reload();
    }

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") === "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (value) {
      this.setState({
        remember: true,
      });
    } else {
      this.setState({
        remember: false,
      });
    }
  }

  // logOut() {
  //   AuthService.logout();
  // }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        (response) => {
          if (response.data.code === 200) {
            if (response.data.data.token) {
              if (this.state.remember === true) {
                Cookies.set(
                  "Mtoken",
                  response.data,
                  { path: "/" },
                  { expires: 3 }
                ); //Expire After 3 days
                //  console.log("3 day " + this.state.remember)
              } else {
                Cookies.set(
                  "Mtoken",
                  response.data,
                  { path: "/" },
                  { expires: 1 }
                ); //Expire After 1 day
                //  console.log("1 day " + this.state.remember)
              }
              this.props.history.push("/dashboard");
              window.location.reload();
            }
            return response.data;
          } else {
            this.setState({
              loading: false,
              message: response.data.messages,
            });
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
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
          <div id="preloader">
            <div data-loader="dual-ring"></div>
          </div>

          <header
            id="header"
            style={{ paddingLeft: "104px", paddingRight: "104px" }}
          >
            <div>
              <div className="header-row">
                <div className="header-column justify-content-start">
                  <div className="logo" style={{ paddingLeft: "3%" }}>
                    {" "}
                    <a className="d-flex" href="/dashboard" title="">
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
                  <div className="col-md-6">
                    <img src={LoginImg} alt="" style={{ width: "90%" }} />
                  </div>

                  <div className="col-md-6 colOnMob">
                    <div className="FormGroupStyle">
                      <img src={Logo} alt="" style={{ width: "40%" }} />
                      <h4
                        style={{
                          color: "#2B335E",
                          fontSize: "30px",
                          fontWeight: "500",
                        }}
                      >
                        <FormattedMessage
                          id="login_page_singin_to_continue"
                          defaultMessage="Sign-In to continue"
                        />
                      </h4>
                    </div>
                    <Form
                      id="loginForm"
                      onSubmit={this.handleLogin}
                      ref={(c) => {
                        this.form = c;
                      }}
                    >
                      <div
                        className="form-group FormGroupStyle"
                        style={{ paddingTop: "10px" }}
                      >
                        <NumberFormat
                          placeholder="Enter your mobile number"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          name="mobile-no"
                          className="form-control InputStyle"
                          style={{ paddingLeft: "20px", paddingRight: "50px" }}
                          id="mobile-no"
                          data-bv-field="mobile-no"
                          required
                          format="+964 ### ### ####"
                          mask="_"
                        />
                        <span className="fas fa-mobile-alt field-icons"></span>
                      </div>
                      <div className="form-group FormGroupStyle">
                        <Input
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          className="form-control InputStyle"
                          style={{ paddingLeft: "20px", paddingRight: "50px" }}
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          required
                          id="password-field"
                          autoComplete=""
                        />
                        <span className="fas fa-lock field-icons"></span>
                        <span
                          toggle="#password-field"
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
                          type="submit"
                          disabled={this.state.loading}
                        >
                          {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <FormattedMessage
                            id="Sign_In"
                            defaultMessage="Sign In"
                          />
                        </button>
                      </div>
                      {this.state.message && (
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
                      <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                          this.checkBtn = c;
                        }}
                      />

                      <div className="form-group FormGroupStyle">
                        <div className="row">
                          <div className="col-sm">
                            <div className="form-check custom-control custom-checkbox">
                              <input
                                id="remember-me"
                                name="remember"
                                className="custom-control-input"
                                type="checkbox"
                                checked={this.state.remember}
                                onChange={this.handleInputChange}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="remember-me"
                              >
                                <FormattedMessage
                                  id="login_page_remember_me"
                                  defaultMessage="Remember Me"
                                />
                              </label>
                            </div>
                          </div>
                          <div className="col-sm text-right">
                            <a className="btn-link" href="/forgotpassword">
                              <FormattedMessage
                                id="login_page_forgot_password"
                                defaultMessage="Forgot Password?"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="form-group FormGroupStyle">
                        <div style={{ textAlign: "center", paddingTop: "3%" }}>
                          <p>
                            <FormattedMessage
                              id="Dont_have_account"
                              defaultMessage="Don’t have an account?"
                            />{" "}
                            <span style={{ color: "#fc2861" }}>
                              <a href="/signup">
                                <FormattedMessage
                                  id="Sign_Up"
                                  defaultMessage="Sign Up"
                                />
                              </a>
                            </span>
                          </p>
                        </div>
                      </div>
                    </Form>
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
