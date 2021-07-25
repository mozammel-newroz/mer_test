import React, { useState } from "react";
import pastPayLogo from "../assets/images/fastpay-logo.svg";
import forgetPasswordIllustration from "../assets/images/forget-password-illustration.svg";
import {
  Button,
  Grid,
  Container,
  TextField,
  CircularProgress,
  Typography,
  Snackbar,
  CssBaseline,
  InputAdornment,
  IconButton,
  makeStyles,
  useHistory,
  LockOutlined,
  Visibility,
  VisibilityOff,
  MuiAlert,
  NumberFormat,
  AuthService,
} from "../common-counter";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  container: {
    marginTop: theme.spacing(24),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  labelIcon: {
    width: "1.2rem",
    color: "#464C6C",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.2),
    backgroundColor: "#FC2861",
  },
  illustration: {
    width: "774px",
    maxWidth: "100%",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ForgotPassword() {
  let history = useHistory();

  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewLogin, setViewLogin] = useState(true);
  const [otpCode, setOTPCode] = useState("");
  const [viewOtpVerification, setViewOtpVerification] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [errorMsgBody, setErrorMsgBody] = useState("");
  const [successMsgBody, setSuccessMsgBody] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [newPasswordIcon, setNewPasswordIcon] = React.useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = React.useState(false);
  const [otpLoading, setOtpLoading] = React.useState(false);

  const [
    viewResetPasswordSuccessMsg,
    setViewResetPasswordSuccessMsg,
  ] = useState(false);

  const onClickNewPasswordIcon = () => {
    setNewPasswordIcon(!newPasswordIcon);
  };

  const onClickConfirmPasswordIcon = () => {
    setConfirmPasswordIcon(!confirmPasswordIcon);
  };

  const generateOTPHandler = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    let requestObj = {
      email: email,
    };
    const res = await AuthService.getForgetPasswordOTP(requestObj);
    //  console.log(res);

    AuthService.getForgetPasswordOTP(requestObj)
      .then((body) => {
        //   console.log("body", body);
        if (body.code === 200) {
          setOtpLoading(false);
          setViewLogin(false);
          setViewOtpVerification(true);
        } else {
          setOtpLoading(false);
          setError(true);
          setErrorMsgBody(body.messages[0]);
        }
      })
      .catch((error) => {
        console.log("Please check your connection!!!");
      });
  };

  const LoginHandler = () => {
    history.push("/counter-panel/login");
    window.location.reload();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleErrorClose = (event) => {
    setError(false);
  };

  const forgetPasswordHandler = (e) => {
    e.preventDefault();
    setOtpLoading(true);

    let requestObj = {
      email: email,
      password: password,
      otp: otpCode,
      password_confirmation: newPassword,
    };

    AuthService.forgetPassword(requestObj)
      .then((res) => {
        if (res && res.code === 200) {
          setOtpLoading(false);
          setViewResetPasswordSuccessMsg(true);
        } else {
          setOtpLoading(false);
          setError(true);
          setErrorMsgBody(res.messages[0]);
        }
      })

      .catch((error) => {
        console.log("Please check your connection!!!");
      });
  };

  const verifyOtpHandler = () => {
    setViewOtpVerification(false);
  };

  return (
    <Container
      component="div"
      item
      lg={12}
      maxWidth="lg"
      className={classes.root}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
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
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {errorMsgBody}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <img
            src={forgetPasswordIllustration}
            className={classes.illustration}
          ></img>
        </Grid>
        {viewLogin === true ? (
          <Grid
            className={classes.paper}
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            style={{ padding: "70px" }}
          >
            <div className="text-left">
              <img
                src={pastPayLogo}
                style={{ width: "70%", marginBottom: "3%" }}
              ></img>
            </div>
            <Typography
              component="h4"
              variant="h4"
              style={{ fontSize: "2rem", color: "#2B335E", fontWeight: "600" }}
            >
              Verify your identity.
            </Typography>
            <Typography
              component="subtitle1"
              variant="subtitle1"
              style={{
                letterSpacing: "0.17rem",
                fontSize: "20px",
                lineHeight: "2.7",
                textAlign: "left",
              }}
            >
              Please enter your email address.
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                //   label="Enter your email address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* <EmailOutlined className={classes.labelIcon} /> */}
                      <span
                        style={{
                          color: "#464C6C",
                          width: "1.2rem",
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        @
                      </span>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="btn btn-primary btn-block my-4"
                style={{
                  padding: "3%",
                  margin: "48px 0px 16px ",
                }}
                onClick={generateOTPHandler}
                disabled={otpLoading}
              >
                {otpLoading && (
                  <CircularProgress size={23} className={classes.progress} />
                )}
                {!otpLoading && "Continue"}
              </Button>
            </form>
          </Grid>
        ) : (
          <Grid className={classes.paper} item xs={12} sm={12} md={5} lg={5}>
            {viewOtpVerification === true ? (
              <>
                <div className="text-left FormGroupStyle">
                  <img
                    src={pastPayLogo}
                    style={{ width: "40%", marginBottom: "3%" }}
                  ></img>
                </div>
                <Typography
                  component="h1"
                  variant="h4"
                  className="FormGroupStyle"
                  style={{
                    fontSize: "2.2rem",
                    color: "#2B335E",
                    fontWeight: "600",
                    textAlign: "left",
                    lineHeight: "2",
                  }}
                >
                  Verify your identity.
                </Typography>
                <Typography
                  className="FormGroupStyle"
                  style={{
                    fontSize: "24px",
                    color: "#2B335E",
                    width: "415px",
                    textAlign: "left",
                  }}
                  component="h1"
                  variant="h6"
                >
                  We have sent 6 digits verification code to your email address.
                </Typography>

                <form className={classes.form} noValidate>
                  <div
                    className="form-group FormGroupStyle"
                    style={{ overflow: "hidden" }}
                  >
                    <div id="divOuter">
                      <div id="divInner">
                        <NumberFormat
                          name="otp"
                          className="form-control InputStyle"
                          style={{
                            marginTop: "20px",
                            paddingLeft: "20px",
                          }}
                          //  value={userOtp}
                          onChange={(e) => setOTPCode(e.target.value)}
                          required
                          autoComplete="true"
                          data-bv-field="otp"
                          id="partitioned"
                          mask="_"
                          maxLength="6"
                          type="password"
                          autoFocus
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="form-group FormGroupStyle"
                    style={{ paddingTop: "1px" }}
                  >
                    <Button
                      variant="contained"
                      className="btn btn-primary btn-block my-4"
                      style={{
                        padding: "3%",
                        margin: "48px 0px 16px ",
                      }}
                      color="secondary"
                      type="submit"
                      fullWidth
                      onClick={() => verifyOtpHandler()}
                      disabled={otpLoading}
                    >
                      {otpLoading && (
                        <CircularProgress
                          size={23}
                          className={classes.progress}
                        />
                      )}
                      {!otpLoading && "Continue"}
                    </Button>
                  </div>
                </form>
              </>
            ) : viewResetPasswordSuccessMsg === false ? (
              <>
                <div className="text-left FormGroupStyle">
                  <img src={pastPayLogo}></img>
                </div>
                <Typography
                  className="FormGroupStyle"
                  component="h1"
                  variant="h4"
                  style={{
                    fontSize: "2rem",
                    color: "#2B335E",
                    fontWeight: "600",
                    textAlign: "left",
                    lineHeight: "2",
                  }}
                >
                  Reset your password
                </Typography>
                <form className={classes.form} noValidate>
                  <div
                    className="form-group FormGroupStyle"
                    style={{ overflow: "hidden" }}
                  >
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Enter new password"
                      type={newPasswordIcon ? "text" : "password"}
                      id="standard-adornment-password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={onClickNewPasswordIcon}
                            >
                              {newPasswordIcon ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),

                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined className={classes.labelIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      margin="normal"
                      fullWidth
                      name="newPassword"
                      label="Confirm password"
                      type={confirmPasswordIcon ? "text" : "password"}
                      id="standard-adornment-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={onClickConfirmPasswordIcon}
                            >
                              {confirmPasswordIcon ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),

                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlined className={classes.labelIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div
                    className="form-group FormGroupStyle"
                    style={{ paddingTop: "1px", width: "90%" }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="btn btn-primary btn-block my-4"
                      style={{
                        padding: "3%",
                        margin: "48px 0px 16px ",
                      }}
                      onClick={forgetPasswordHandler}
                      disabled={otpLoading}
                    >
                      {otpLoading && (
                        <CircularProgress
                          size={23}
                          className={classes.progress}
                        />
                      )}
                      {!otpLoading && "Continue"}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-left FormGroupStyle">
                  <img src={pastPayLogo}></img>
                </div>
                <Typography
                  className="FormGroupStyle"
                  component="h1"
                  variant="h4"
                  style={{
                    fontSize: "1.8rem",
                    color: "#2B335E",
                    fontWeight: "600",
                    textAlign: "left",
                    lineHeight: "2",
                  }}
                >
                  Reset Password Successful
                </Typography>
                <Typography
                  className="FormGroupStyle"
                  style={{
                    fontSize: "24px",
                    color: "#2B335E",
                    width: "400px",
                    textAlign: "left",
                  }}
                  component="h1"
                  variant="h6"
                >
                  Your password has been reset successfully.
                </Typography>
                <form className={classes.form} noValidate>
                  <div
                    className="form-group FormGroupStyle"
                    style={{ paddingTop: "1px" }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={LoginHandler}
                      disabled={otpLoading}
                    >
                      {otpLoading && (
                        <CircularProgress
                          size={23}
                          className={classes.progress}
                        />
                      )}
                      {!otpLoading && "Login"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
