import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Snackbar,
  Paper,
  Typography,
  CircularProgress,
  Breadcrumbs,
  HomeIcon,
  MuiAlert,
  NavLink,
  makeStyles,
  commonService,
  AddBoxIcon,
  SpeedIcon,
  QRCode,
} from "../../../common-counter";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
  },
  paper: {
    padding: theme.spacing(2),
    color: "#2B335E",
    fontSize: "18px",
    textTransform: "capitalize",
  },
  paperText: {
    padding: theme.spacing(2),
    fontSize: "16px",
    textTransform: "capitalize",
  },
  paperEmail: {
    padding: theme.spacing(2),
    fontSize: "16px",
  },
  listIcon: { width: 20, paddingRight: theme.spacing(0.5) },
  link: {
    display: "flex",
    textDecoration: "none",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  disabled: {
    border: "1px solid #1DBF73",
    textTransform: "Capitalize",
    color: "#BEBDBD",
  },
}));

export default function BasicInfo() {
  const classes = useStyles();

  const [basicInfo, setBasicInfo] = useState("");
  const [errorMsgBody, setErrorMsgBody] = useState("");
  const [successMsgBody, setSuccessMsgBody] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [dataTableIsLoading, setDataTableIsLoading] = React.useState(true);

  const downloadQR = () => {
    const canvas = document.getElementById("QR-Code-Physical-counter");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode Physical Store (Counter).png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
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

  const handleSearch = async () => {
    setDataTableIsLoading(true);
    setBasicInfo([]);
    const res = await commonService.getBasicInfoList();
    if (res.code === 200 && res.data.user.length === 0) {
      setError(true);
      setErrorMsgBody("No Data Found");
      setDataTableIsLoading(false);
    } else if (res.code === 200) {
      setBasicInfo(res && res.data && res.data.user);
      setDataTableIsLoading(false);
    } else {
      setError(true);
      setErrorMsgBody(res.messages);
      setDataTableIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
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
      <Breadcrumbs style={{ marginTop: "10px" }} aria-label="breadcrumb">
        <NavLink
          to="/counter-panel/dashboard"
          style={{ color: "#2B335E99" }}
          className={classes.link}
        >
          <HomeIcon className={classes.icon} />
          Home
        </NavLink>
        <NavLink
          to="/counter-panel/basic-info"
          style={{ color: "#2B335E99" }}
          className={classes.link}
        >
          <SpeedIcon className={classes.icon} />
          Basic Information
        </NavLink>
        <Typography style={{ color: "#2B335E" }} className={classes.link}>
          <AddBoxIcon className={classes.listIcon} /> List
        </Typography>
      </Breadcrumbs>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            textAlign: "left",
            margin: "15px 0",
            color: "#2B335E",
            fontSize: "25px",
          }}
        >
          Basic Information List
        </Typography>
      </div>

      {dataTableIsLoading === true ? (
        <Box mt={15} className="text-center">
          {" "}
          <CircularProgress
            size={30}
            className={classes.progress}
            thickness={3}
          />
        </Box>
      ) : (
        <Paper elevation="3">
          <div className="container-fluid">
            <>
              <Typography
                style={{
                  textAlign: "left",
                  margin: "15px 0",
                  color: "#fc2861",
                  fontSize: "20px",
                  paddingTop: "15px",
                }}
              >
                Merchant Account Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    Name:
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    business Type:
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    business category:
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    mobile number:
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.merchant && basicInfo.merchant.name
                      ? basicInfo.merchant && basicInfo.merchant.name
                      : "None"}
                  </Grid>
                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.merchant && basicInfo.merchant.business_type
                      ? basicInfo.merchant && basicInfo.merchant.business_type
                      : "None"}
                  </Grid>
                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.merchant && basicInfo.merchant.business_category
                      ? basicInfo.merchant &&
                        basicInfo.merchant.business_category
                      : "None"}
                  </Grid>
                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.merchant && basicInfo.merchant.mobile_no
                      ? basicInfo.merchant && basicInfo.merchant.mobile_no
                      : "None"}
                  </Grid>
                </Grid>
              </Grid>

              <Typography
                style={{
                  textAlign: "left",
                  margin: "15px 0",
                  color: "#fc2861",
                  fontSize: "20px",
                  paddingTop: "15px",
                }}
              >
                Counter Account Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    user name:
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    store id:
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{ width: "115px", height: "115px" }}
                  >
                    logo:
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    address:
                  </Grid>
                  <Grid
                    className={classes.paper}
                    item
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    Qr Code:
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.counter && basicInfo.counter.user_name
                      ? basicInfo.counter && basicInfo.counter.user_name
                      : "None"}
                  </Grid>
                  <Grid
                    className={classes.paperEmail}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.counter && basicInfo.counter.store_id
                      ? basicInfo.counter && basicInfo.counter.store_id
                      : "None"}
                  </Grid>
                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{ width: "115px", height: "115px" }}
                  >
                    {basicInfo.counter && basicInfo.counter.logo ? (
                      <img
                        src={basicInfo.counter && basicInfo.counter.logo}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                          border: "1px solid #eee",
                          padding: "3px",
                          borderRadius: "5px",
                        }}
                      />
                    ) : (
                      "None"
                    )}
                  </Grid>
                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.counter && basicInfo.counter.address
                      ? basicInfo.counter && basicInfo.counter.address
                      : "None"}
                  </Grid>

                  <Grid
                    className={classes.paperText}
                    xs={12}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    {basicInfo.counter && basicInfo.counter.profile_qr ? (
                      <div style={{ flexFlow: "column" }}>
                        <div className="divQR">
                          <QRCode
                            id="QR-Code-Physical-counter"
                            value={
                              basicInfo.counter && basicInfo.counter.profile_qr
                            }
                            bgColor="#F0F6FA"
                            size={190}
                            level={"H"}
                            includeMargin={true}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <a
                            onClick={downloadQR}
                            href="#"
                            className="btn btn-sm"
                            style={{
                              width: "100%",
                              float: "left",
                              borderRadius: "50px",
                              marginRight: "auto",
                              marginTop: "15px",
                              border: "1px solid red",
                              color: "red",
                              boxShadow: "none",
                            }}
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ) : (
                      "None"
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </>
          </div>
        </Paper>
      )}
    </Container>
  );
}
