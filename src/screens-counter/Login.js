import React, { useState } from "react";
import LoginScreen from "../assets/images/loginScreen2.svg";
import Logo from "../assets/images/Logo.svg";
import {
  NavLink,
  useHistory,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  CircularProgress,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  Grid,
  NumberFormat,
  MuiAlert,
  makeStyles,
  withStyles,
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  green,
  AuthService,
} from "../common-counter";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         FastPay
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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
  paper: {
    marginTop: "13%",
    display: "flex",
    flexDirection: "column",

    padding: "0 6% ",
    borderRadius: "5px",
    textAlign: "left",
  },
  progress: {
    color: "#fff",
  },
  forgotPassword: {
    display: "flex",
    justifyContent: "flex-end",
    textDecoration: "none",
    color: "#FC2861",
    fontSize: "1rem",
    letterSpacing: "0.0125rem",
    marginTop: "15px",
  },
  labelIcon: {
    width: "1.2rem",
    color: "#464C6C",
  },
  rememberMe: {
    display: "flex",
    justifyContent: "flex-start",
    textDecoration: "none",
    color: "#00000099",
    fontSize: "1.3125rem",
    letterSpacing: "0.0125rem",
    marginTop: "8px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    // maxWidth: '20%',
    width: "26% ",
    alignSelf: "right",
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(true);
  const [otp, setOtp] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMsgBody, setErrorMsgBody] = useState("");
  const [successMsgBody, setSuccessMsgBody] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [otpLoading, setOtpLoading] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginLoading(true);

    const user = {
      email,
      password,
    };
    AuthService.login(user).then((res) => {
      if (res.code === 200) {
        setLoginLoading(false);
        setOtp(true);
      } else {
        setError(true);
        setLoginLoading(false);
        setErrorMsgBody(res.messages[0]);
      }
    });
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
  const handleSubmitWithOtp = (e) => {
    e.preventDefault();
    setOtpLoading(true);
    const user = {
      email,
      password,
      userOtp,
    };
    AuthService.loginWithOtp(user).then((res) => {
      if (res.code === 200) {
        setOtpLoading(false);
        history.push("/counter-panel/dashboard");
      } else {
        setOtpLoading(false);
        setError(true);
        setErrorMsgBody(res.messages[0]);
      }
    });
  };

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <Container component="main" maxWidth="lg">
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
          <CssBaseline />

          <div id="main-wrapper" className="WebView pt-4">
            <div id="content">
              <div className="container py-5">
                <div className="row no-gutters h-100">
                  <div style={{ display: "flex", backgroundColor: "white" }}>
                    <Paper
                      elevation={0}
                      style={{
                        padding: "0 4%",
                        marginTop: "13%",
                        maxWidth: "50%",
                      }}
                    >
                      <img style={{ width: "100%" }} src={LoginScreen} />
                    </Paper>
                    <div className={classes.paper}>
                      <img
                        style={{ width: "40%", marginBottom: "3%" }}
                        src={Logo}
                      />
                      {otp ? (
                        <>
                          <Typography
                            style={{
                              fontSize: "30px",
                              color: "#2B335E",
                              fontWeight: "500",
                            }}
                            component="h1"
                            variant="h4"
                          >
                            Verify your identity.
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "1rem",
                              color: "#2B335E",
                              fontWeight: "bold",
                            }}
                            component="h1"
                            variant="h6"
                          >
                            We have sent 6 digits verification code to your
                            email address.
                          </Typography>
                          <form className={classes.form} noValidate>
                            <div
                              className="form-group"
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
                                    onChange={(e) => setUserOtp(e.target.value)}
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
                              className="form-group"
                              style={{ paddingTop: "1px", width: "90%" }}
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
                                onClick={handleSubmitWithOtp}
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
                          <Typography
                            style={{
                              fontSize: "2rem",
                              color: "#2B335E",
                              fontWeight: "bold",
                            }}
                            component="h1"
                            variant="h6"
                          >
                            Sign-in to Continue
                          </Typography>
                          <form className={classes.form} noValidate>
                            <TextField
                              margin="normal"
                              fullWidth
                              id="email"
                              placeholder="Enter your email address"
                              className="form-control"
                              name="email"
                              autoComplete="email"
                              autoFocus
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailOutlined
                                      className={classes.labelIcon}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            <TextField
                              //    style={{ marginBottom: "30px" }}
                              margin="normal"
                              fullWidth
                              type={showPassword ? "text" : "password"}
                              name="password"
                              className="form-control"
                              placeholder="Enter your password"
                              id="password"
                              autoComplete="current-password"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),

                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOutlined
                                      className={classes.labelIcon}
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(e) => setPassword(e.target.value)}
                            />

                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Button
                                type="submit"
                                variant="contained"
                                className="btn btn-primary btn-block my-4"
                                style={{ padding: "3%" }}
                                color="secondary"
                                onClick={handleSubmit}
                                disableElevation
                                fullWidth
                                disabled={loginLoading}
                              >
                                {loginLoading && (
                                  <CircularProgress
                                    size={23}
                                    className={classes.progress}
                                  />
                                )}
                                {!loginLoading && "Continue"}
                              </Button>
                            </div>
                            <Grid container>
                              <Grid item xs>
                                <FormControlLabel
                                  className={classes.rememberMe}
                                  control={
                                    <GreenCheckbox
                                      checked={checked}
                                      onChange={handleChange}
                                      name="checkedG"
                                    />
                                  }
                                  label="Remember me"
                                />
                              </Grid>
                              <Grid item xs>
                                <NavLink
                                  to="/counter-panel/forgot-password"
                                  className={classes.forgotPassword}
                                  variant="body2"
                                >
                                  Forgot password?
                                </NavLink>
                              </Grid>
                            </Grid>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
