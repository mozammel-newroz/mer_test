import React, { useState, useEffect } from "react";
import {
  Cookies,
  NavLink,
  useHistory,
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  Menu,
  AccountCircle,
  MoreIcon,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CheckCircle,
  MuiAlert,
  LockOutlined,
  Visibility,
  VisibilityOff,
  Button,
  TextField,
  MenuItem,
  Slide,
  Typography,
  IconButton,
  Snackbar,
  Dialog,
  InputAdornment,
  DialogContent,
  Grid,
  Divider,
  commonService,
} from "../common-counter";
import pastPayLogo from "../assets/images/fastpay-light-logo.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "3.75rem !important",
    backgroundColor: "#2B335E",
  },
  logo: {
    width: "7rem",
    height: "auto",
  },
  labelIcon: {
    width: "1.2rem",
    color: "#464C6C",
  },
  grow: {
    flexGrow: 1,
  },
  paddingTopBottom: {
    padding: "15px 15px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  changePasswordDialog: {
    padding: theme.spacing(6),
  },
  changePasswordSuccessDialog: {
    padding: theme.spacing(2),
    height: "350px",
    color: "#1DBF73",
  },
  checkCircle: {
    fontSize: "700%",
    margin: "0 0 40px 0",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.2),
    backgroundColor: "#FC2861",
  },
  menuDialog: {
    border: "1px solid red",
  },
}));

export default function Header() {
  let history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [errorMsgBody, setErrorMsgBody] = useState("");
  const [successMsgBody, setSuccessMsgBody] = useState("");
  const [userInfo, setUserinfo] = useState({});
  const [oldPasswordIcon, setOldPasswordIcon] = React.useState(false);
  const [newPasswordIcon, setNewPasswordIcon] = React.useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = React.useState(false);

  const onClickOldPasswordIcon = () => {
    setOldPasswordIcon(!oldPasswordIcon);
  };

  const onClickNewPasswordIcon = () => {
    setNewPasswordIcon(!newPasswordIcon);
  };

  const onClickConfirmPasswordIcon = () => {
    setConfirmPasswordIcon(!confirmPasswordIcon);
  };

  const [
    viewChangePasswordSuccessMsg,
    setViewChangePasswordSuccessMsg,
  ] = useState(false);

  const [error, setError] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dialogHandleClose = () => {
    setDialogOpen(false);
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignout = () => {
    commonService
      .userSignOut()
      .then((res) => {})
      .catch((error) => {
        console.log("Please check your connection!!!");
      });
    Cookies.remove("counter_acc");
    Cookies.remove("user");
    localStorage.clear();
    history.push("/counter-panel/login");
  };

  const handleChangePassword = () => {
    setDialogOpen(true);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemAvatar>
          <Avatar
            alt="Profile Picture"
            src={userInfo && userInfo.counter && userInfo.counter.logo}
            className={classes.large}
          />{" "}
        </ListItemAvatar>
        <ListItemText
          primary={userInfo && userInfo.counter && userInfo.counter.user_name}
          secondary={userInfo && userInfo.counter && userInfo.counter.store_id}
        />
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleChangePassword}
        className={classes.paddingTopBottom}
      >
        Change Password
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleSignout} className={classes.paddingTopBottom}>
        Sign Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const changePasswordHandler = (e) => {
    e.preventDefault();

    let requestObj = {
      old_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    };

    commonService
      .changeUserPassword(requestObj)
      .then((res) => {
        //  console.log('res forget pass', res);
        if (res && res.code === 200) {
          setViewChangePasswordSuccessMsg(true);
          setTimeout(() => {
            handleSignout();
          }, 2000);
        } else {
          setError(true);
          setErrorMsgBody(res.messages[0]);
        }
      })

      .catch((error) => {
        console.log("Please check your connection!!!");
      });
  };

  useEffect(() => {
    const user = Cookies.getJSON("user");
    setUserinfo(user);
  }, []);

  return (
    <div className={classes.grow}>
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
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={dialogHandleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          {viewChangePasswordSuccessMsg === false ? (
            <Grid sm={12} spacing={3} className={classes.changePasswordDialog}>
              <Typography component="h4" variant="h4">
                Reset your password
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  margin="normal"
                  fullWidth
                  name="oldPassword"
                  label="Old password"
                  type={oldPasswordIcon ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={onClickOldPasswordIcon}
                        >
                          {oldPasswordIcon ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),

                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined className={classes.labelIcon} />
                      </InputAdornment>
                    ),
                  }}
                  id="oldPassword"
                  autoComplete="current-password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="newPassword"
                  label="Enter new password"
                  type={newPasswordIcon ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={onClickNewPasswordIcon}
                        >
                          {newPasswordIcon ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),

                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined className={classes.labelIcon} />
                      </InputAdornment>
                    ),
                  }}
                  id="newPassword"
                  autoComplete="current-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  type={confirmPasswordIcon ? "text" : "password"}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={changePasswordHandler}
                >
                  Continue
                </Button>
              </form>
            </Grid>
          ) : (
            <Grid
              container
              sm={12}
              className={classes.changePasswordSuccessDialog}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <CheckCircle className={classes.checkCircle} />

              <Typography component="h4" variant="h4">
                Password Update successfully
              </Typography>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
      <AppBar position="fixed" elevation={0} className={classes.root}>
        <Toolbar>
          <>
            <NavLink to="/counter-panel/dashboard">
              <img src={pastPayLogo} className={classes.logo}></img>
            </NavLink>
          </>
          <div className="navWrapper">
            <NavLink
              //   onClick={(e) => navlinkHandler(e, 'home')}
              id="home"
              to="/counter-panel/dashboard"
              className="navigation__link"
              //   onMouseEnter={hideMegamenu}
            >
              home
            </NavLink>
            <NavLink
              //   onClick={(e) => navlinkHandler(e, 'home')}
              id="home"
              to="/counter-panel/basic-info"
              className="navigation__link "
              //   onMouseEnter={hideMegamenu}
            >
              Basic Information
            </NavLink>
            <NavLink
              //   onClick={(e) => navlinkHandler(e, 'home')}
              id="home"
              to="/counter-panel/transactions"
              className="navigation__link "
              //   onMouseEnter={hideMegamenu}
            >
              Transactions
            </NavLink>

          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 17 new notifications">
              <Badge badgeContent={17}>
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <Avatar
                alt="Profile Picture"
                src={userInfo && userInfo.counter && userInfo.counter.url}
                className={classes.large}
              />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
