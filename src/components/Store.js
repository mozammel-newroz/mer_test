import React, { useEffect, useState, useRef } from "react";
// import Logo from "../assets/images/logo.png";
import QRCode from "qrcode.react";
import Shops from "../services/shops";
import Vnavbar from "./Vnavbar";
import SideBar from "./sidebar";
import OnlineStore from "../../src/assets/images/Online Store.svg";
import MobileView from "./MobileView";
import { FormattedMessage } from "react-intl";
import Footer from "./Footer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TablePagination from "@material-ui/core/TablePagination";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import hostAPI from "../services/GetHost";
import NoImg from "../assets/images/NoImg.png";
import Navbar from "./Navbar";
import Mapp from "./Map";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Store() {
  let history = useHistory();

  const [errorMsgBody, setErrorMsgBody] = useState("");
  const [successMsgBody, setSuccessMsgBody] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerStep, setRegisterStep] = useState(true);
  const [viewStep, setViewStep] = useState(false);
  const [updateStep, setUpdateStep] = useState(false);
  const [updateOnlineStep, setUpdateOnlineStep] = useState(false);
  const [allconfig, setAllconfig] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [category_id_store, setCategory_id_store] = useState("");
  const [trade_license_store, setTrade_license_store] = useState(null);
  const [store_logo_store, setStore_logo_store] = useState(null);
  const [address_store, setAddress_store] = useState("");
  const [store_url_store, setStore_url_store] = useState("");
  const [ipn_url_store, setIpn_url_store] = useState("");
  const [success_url_store, setSuccess_url_store] = useState("");
  const [cancel_url_store, setCancel_url_store] = useState("");
  const [store_password_store, setStore_password_store] = useState("");
  const [ConfigID, setConfigID] = useState("");
  const [viewStoreDetails, setViewStoreDetails] = useState(false);
  const [viewOnlineStoreDetails, setViewOnlineStoreDetails] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  const [logoView, setLogoView] = useState("");
  const [storeID, setStoreID] = useState("");
  const [storeType, setStoreType] = useState("");
  const [tradeLicenseView, setTradeLicenseView] = useState("");
  const [addressView, setAddressView] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [ipnUrl, setIpnUrl] = useState("");
  const [successUrl, setSuccessUrl] = useState("");
  const [cancelUrl, setCancelUrl] = useState("");
  const [email_StoreID, setEmail_StoreID] = useState("");
  const [counterName, setCounterName] = useState("");
  const [qr_Cod, setQr_Cod] = useState("");
  const [lngValue, setLngValue] = useState("");
  const [latValue, setLatValue] = useState("");

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = React.useState(0);

  const fileRef = useRef(null);

  useEffect(() => {
    setLngValue(localStorage.getItem("lng"));
    setLatValue(localStorage.getItem("lat"));

    Shops.getCategories().then(
      (response) => {
        if (response.data.code === 200) {
          setCategories(response.data && response.data.data);
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      }
    );

    Shops.getViewStores(page + 1).then(
      (response) => {
        if (response.data.code === 200) {
          setTotalRows(
            response &&
              response.data &&
              response.data.data_additional &&
              response.data.data_additional.total
          );
          if (response && response.data && response.data.data.length < 0) {
            setRegisterStep(true);
            setViewStep(false);
            setUpdateStep(false);
          } else {
            setAllconfig(response.data && response.data.data);
            setRegisterStep(false);
            setViewStep(true);
            setUpdateStep(false);
          }
        } else {
          setOpen3(true);
            setErrorMsgBody(response && response.data && response.data.messages);
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      }
    );
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const downloadQR = () => {
    const canvas = document.getElementById("QR-Code-Physical");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QR-Code-Physical Store.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const downloadKycDocHandler = (e, url) => {
    let a = document.createElement("a");
    a.href = String(url);
    a.target = "_blank";
    a.download = "trade_lisence.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDeleteLogo = (e, id) => {
    e.preventDefault();
    Shops.DeleteStoreLogo(id).then(
      (response) => {
        if (response.data.code === 200) {
          if (response.data.code === 200) {
            setOpen3(true);
            setSuccessMsgBody(response.data.messages);
          } else {
            setOpen3(true);
            setErrorMsgBody(response.data.messages);
            setSuccessful(false);
            setLoading(false);
          }
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      }
    );
  };

  const handleLngLat = () => {
    setLngValue(localStorage.getItem("lng"));
    setLatValue(localStorage.getItem("lat"));
    setOpen1(true);
  };

  const handlePreview = () => {
    setOpen2(true);
  };

  const handlePreviewMap = () => {
    setShowMap(!showMap);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const onChangeCountrtName = (e) => {
    setCounterName(e.target.value);
  };

  const onChangeStore_password = (e) => {
    setStore_password_store(e.target.value);
  };

  const onChangeEmailStore_ID = (e) => {
    setEmail_StoreID(e.target.value);
  };

  const onChangeCategoryId = (e) => {
    setCategory_id_store(e.target.value);
  };

  const onChangeTradeLicence = (e) => {
    setTrade_license_store(e.target.files[0]);
  };

  const onChangeStoreLogo = (e) => {
    setStore_logo_store(e.target.files[0]);
  };

  const onChangeAddress = (e) => {
    setAddress_store(e.target.value);
  };

  const onChangeIpn_url = (e) => {
    setIpn_url_store(e.target.value);
  };

  const onChangeSuccess_url = (e) => {
    setSuccess_url_store(e.target.value);
  };

  const onChangeCancel_url = (e) => {
    setCancel_url_store(e.target.value);
  };

  const onChangeStore_url_store = (e) => {
    setStore_url_store(e.target.value);
  };

  const handleBackBtn = () => {
    setViewStep(true);
    setViewStoreDetails(false);
    setViewOnlineStoreDetails(false);
  };

  const handleCancelUpdate = () => {
    setViewStep(true);
    setUpdateStep(false);
    setUpdateOnlineStep(false);
  };

  const ViewOnlineStore = (
    e,
    id,
    storeID,
    storeType,
    categoryID,
    tradeLicenseView,
    logoView,
    addressView,
    storeUrl,
    ipnUrl,
    successUrl,
    cancelUrl,
    categoryText
  ) => {
    e.preventDefault();
    setViewOnlineStoreDetails(true);
    setViewStep(false);
    setConfigID(id);
    setCategoryID(categoryID);
    setLogoView(logoView);
    setStoreID(storeID);
    setStoreType(storeType);
    setTradeLicenseView(tradeLicenseView);
    setAddressView(addressView);
    setStoreUrl(storeUrl);
    setIpnUrl(ipnUrl);
    setSuccessUrl(successUrl);
    setCancelUrl(cancelUrl);
    setCategoryText(categoryText);
  };

  const ViewStore = (
    e,
    id,
    email_StoreID,
    storeType,
    categoryID,
    categoryText,
    tradeLicenseView,
    logoView,
    addressView,
    counterName,
    latValue,
    lngValue,
    qr_Cod
  ) => {
    e.preventDefault();
    setViewStoreDetails(true);
    setViewStep(false);
    setConfigID(id);
    setCategoryID(categoryID);
    setCategoryText(categoryText);
    setLogoView(logoView);
    setEmail_StoreID(email_StoreID);
    setStoreType(storeType);
    setTradeLicenseView(tradeLicenseView);
    setAddressView(addressView);
    setCounterName(counterName);
    setLatValue(latValue);
    setLngValue(lngValue);
    setQr_Cod(qr_Cod);
  };

  const UpdateOnlineView = (
    e,
    id,
    //  storeID,
    storeType,
    categoryID,
    tradeLicenseView,
    logoView,
    addressView,
    storeUrl,
    ipnUrl,
    successUrl,
    cancelUrl
  ) => {
    e.preventDefault();
    setUpdateOnlineStep(true);
    setViewStep(false);
    setViewOnlineStoreDetails(false);
    setConfigID(id);
    //  setCategoryID(categoryID);
    setCategory_id_store(categoryID);
    setLogoView(logoView);
    //  setStoreID(storeID);
    //  setStoreType(storeType);
    setStoreID(storeType === "Online" ? "1" : "");

    //   setShop_id_store(storeType === "Online" ? "1" : "");
    setStoreType(storeType);

    setTradeLicenseView(tradeLicenseView);
    setAddress_store(addressView);
    setStore_url_store(storeUrl);
    setIpn_url_store(ipnUrl);
    setSuccess_url_store(successUrl);
    setCancel_url_store(cancelUrl);
  };

  const UpdateView = (
    e,
    id,
    //  storeID,
    storeType,
    categoryID,
    tradeLicenseView,
    logoView,
    addressView,
    counterName,
    latValue,
    lngValue,
    email_StoreID
  ) => {
    e.preventDefault();
    setUpdateStep(true);
    setViewStep(false);
    setViewStoreDetails(false);
    setViewStep(false);
    setConfigID(id);
    //  setCategoryID(categoryID);
    setCategory_id_store(categoryID);
    setLogoView(logoView);
    //  setStoreID(storeID);
    //  setShop_id_store(storeType === "Offline" ? "2" : "");
    setStoreID(storeType === "Offline" ? "2" : "");
    setStoreType(storeType);
    //   setStoreType(storeType);
    //   setStoreType(storeType === "Offline" ? "2" : "");
    setTradeLicenseView(tradeLicenseView);
    setAddress_store(addressView);
    setCounterName(counterName);
    setLatValue(latValue);
    setLngValue(lngValue);
    setEmail_StoreID(email_StoreID);
  };

  const handleUpdateOnlineStore = async (e) => {
    e.preventDefault();

    setSuccessMsgBody([]);
    setErrorMsgBody([]);
    setSuccessful(false);
    setLoading(true);
    setUpdateOnlineStep(true);

    const formdata = new FormData();
    formdata.append("store_configuration_id", ConfigID);
    formdata.append("category_id", category_id_store);

    if (trade_license_store !== null) {
      formdata.append("trade_license", trade_license_store);
    }
    if (store_logo_store !== null) {
      formdata.append("store_logo", store_logo_store);
    }

    formdata.append("address", address_store);
    formdata.append("store_url", store_url_store);
    formdata.append("success_url", success_url_store);
    formdata.append("cancel_url", cancel_url_store);
    formdata.append("ipn_url", ipn_url_store);
    if (store_password_store !== null) {
      formdata.append("store_password", store_password_store);
    }

    const userr = Cookies.getJSON("Mtoken");

    let res = await axios({
      url: `${hostAPI.getHost()}api/v1/private/user/store/update-store-configuration`,
      method: "post",
      data: formdata,
      headers: {
        Authorization: "Bearer " + userr.data.token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
      },
    });

    if (res.data.code === 200) {
      setOpen3(true);
      setSuccessMsgBody(res.data.messages);
      setSuccessful(true);
      history.push("/store");
    } else {
      setOpen3(true);
      setErrorMsgBody(res.data.messages);
      setSuccessful(false);
      setLoading(false);
    }
  };

  const handleUpdatePhysicalStore = async (e) => {
    e.preventDefault();

    setSuccessMsgBody([]);
    setErrorMsgBody([]);
    setSuccessful(false);
    setLoading(true);
    setUpdateStep(true);

    const formdata = new FormData();
    formdata.append("store_configuration_id", ConfigID);
    formdata.append("category_id", category_id_store);
    formdata.append("shop_type_id", storeID);

    if (trade_license_store !== null) {
      formdata.append("trade_license", trade_license_store);
    }
    if (store_logo_store !== null) {
      formdata.append("store_logo", store_logo_store);
    }

    formdata.append("address", address_store);
    if (store_password_store !== null) {
      formdata.append("password", store_password_store);
    }
    formdata.append("store_id", email_StoreID);
    formdata.append("counter_name", counterName);
    formdata.append("lng", lngValue);
    formdata.append("lat", latValue);

    const userr = Cookies.getJSON("Mtoken");

    let res = await axios({
      url: `${hostAPI.getHost()}api/v1/private/user/store/physical-shop/update`,
      method: "post",
      data: formdata,
      headers: {
        Authorization: "Bearer " + userr.data.token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        type: "formData",
      },
    });

    if (res.data.code === 200) {
      setOpen3(true);
      setSuccessMsgBody(res.data.messages);
      setSuccessful(true);
      //  history.push("/store");
    } else {
      setOpen3(true);
      setErrorMsgBody(res.data.messages);
      setSuccessful(false);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
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
                <Snackbar
                  open={open1}
                  autoHideDuration={3000}
                  onClose={handleClose1}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert onClose={handleClose1} severity="success">
                    Location confirmed successfully
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={open3}
                  autoHideDuration={3000}
                  onClose={handleClose3}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert onClose={handleClose3} severity="success">
                    {successMsgBody}
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={open3}
                  autoHideDuration={3000}
                  onClose={handleClose3}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert onClose={handleClose3} severity="error">
                    {errorMsgBody}
                  </Alert>
                </Snackbar>
                {/* 1) Sorry You didn’t register your online store */}
                {registerStep && (
                  <div
                    id="NullStep"
                    className="my-4 text-center"
                    style={{ paddingTop: "3%", width: "100%" }}
                  >
                    <h3 style={{ color: "#2D335B", padding: "37px 0" }}>
                      <FormattedMessage
                        id="register_online_store"
                        defaultMessage="Sorry You didn’t register your online store"
                      />
                    </h3>
                    <img src={OnlineStore} alt="" style={{ width: "70%" }} />
                    <div className="text-center">
                      <a href="/store/add-store" className="btn btn-primary">
                        <FormattedMessage
                          id="Add_store"
                          defaultMessage="Add a store"
                        />
                      </a>
                      {/* <button
                        onClick={addStore}
      
                        className="btn btn-primary"
                        style={{
                          width: "30%",
                          borderRadius: "50px",
                          marginTop: "45px",
                        }}
                      >
                        <FormattedMessage
                          id="Add_store"
                          defaultMessage="Add a store"
                        />
                      </button> */}
                    </div>
                  </div>
                )}

                {/* 2) Update Physical Store */}
                {updateStep && (
                  <div>
                    <h4>
                      <FormattedMessage
                        id="Your_Physical_Store_Details"
                        defaultMessage="Your Physical Store Details"
                      />
                    </h4>
                    <div className="col-lg-10 col-s-12 pt-4">
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12 mx-auto">
                          {!successful && (
                            <div>
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "18px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Category"
                                        defaultMessage="Category"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12">
                                    <FormControl
                                      variant="outlined"
                                      fullWidth
                                      //    className={classes.formControl}
                                      style={{ marginBottom: "3%" }}
                                      size="small"
                                      label="Reciever is"
                                      id="searchtype"
                                    >
                                      {/* <InputLabel id="transType">
                                        {categoryID}
                                      </InputLabel> */}

                                      <Select
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                          borderRadius: "16px",
                                          height: "52px",
                                        }}
                                        labelid="Category"
                                        id="demo-simple-select-filled"
                                        value={category_id_store}
                                        label="Category"
                                        onChange={onChangeCategoryId}
                                      >
                                        <MenuItem value="" key="">
                                          <em>
                                            <FormattedMessage
                                              id="None"
                                              defaultMessage="None"
                                            />
                                          </em>
                                        </MenuItem>
                                        {Categories.map((cat) => (
                                          <MenuItem
                                            key={cat && cat.id}
                                            value={cat && cat.id}
                                          >
                                            {cat && cat.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="kyc_page_trade_license"
                                        defaultMessage="Trade License"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div
                                      className="input-group"
                                      style={{ flexFlow: "row" }}
                                    >
                                      {tradeLicenseView &&
                                      tradeLicenseView.endsWith("pdf") ? (
                                        <button
                                          className="AddStore"
                                          style={{ width: "150px" }}
                                          onClick={(e) =>
                                            downloadKycDocHandler(
                                              e,
                                              tradeLicenseView
                                            )
                                          }
                                        >
                                          <FormattedMessage
                                            id="Preview"
                                            defaultMessage="Preview"
                                          />
                                        </button>
                                      ) : (
                                        <button
                                          className="AddStore"
                                          style={{ width: "150px" }}
                                          onClick={handlePreview}
                                        >
                                          <FormattedMessage
                                            id="Preview"
                                            defaultMessage="Preview"
                                          />
                                        </button>
                                      )}

                                      <Modal
                                        className="ModalStyle"
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={open2}
                                        onClose={handleClose2}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                          timeout: 500,
                                        }}
                                      >
                                        <Fade in={open2}>
                                          <div className="row">
                                            <div className="col-md-9 col-lg-7 col-xl-3 mx-auto">
                                              <div
                                                className="bg-white text-center shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                                style={{
                                                  borderRadius: "16px",
                                                }}
                                              >
                                                <p
                                                  style={{
                                                    fontWeight: "500",
                                                    float: "right",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={handleClose2}
                                                >
                                                  X
                                                </p>
                                                <div className="my-4">
                                                  {tradeLicenseView ? (
                                                    <img
                                                      src={tradeLicenseView}
                                                      style={{ width: "100%" }}
                                                    />
                                                  ) : (
                                                    <img
                                                      src={NoImg}
                                                      style={{ width: "100%" }}
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Fade>
                                      </Modal>
                                      <span style={{ padding: "12px" }}>
                                        {" "}
                                        Or{" "}
                                      </span>
                                      <div className="input-group">
                                        <input
                                          multiple
                                          accept="image/*"
                                          ref={fileRef}
                                          type="file"
                                          placeholder="Upload trade license"
                                          onChange={onChangeTradeLicence}
                                          name="trade_license_store"
                                          className="form-control MerchantInput"
                                          style={{
                                            border: "1px solid #3494E629",
                                          }}
                                          id="trade_license_store"
                                          data-bv-field="trade_license_store"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Logo"
                                        defaultMessage="Logo"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    {logoView ? (
                                      <img src={logoView} width="70" />
                                    ) : (
                                      <img src={NoImg} width="70" />
                                    )}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  ></div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div
                                      className="input-group"
                                      style={{ flexFlow: "row" }}
                                    >
                                      <p
                                        style={{
                                          cursor: "pointer",
                                          color: "#FC2861",
                                          paddingTop: "10px",
                                        }}
                                        onClick={(e) =>
                                          handleDeleteLogo(e, ConfigID)
                                        }
                                      >
                                        DELETE
                                      </p>{" "}
                                      <span style={{ padding: "12px" }}>
                                        {" "}
                                        Or{" "}
                                      </span>
                                      <div className="input-group">
                                        <input
                                          multiple
                                          accept="image/*"
                                          ref={fileRef}
                                          type="file"
                                          placeholder="Upload Logo"
                                          onChange={onChangeStoreLogo}
                                          name="store_logo_store"
                                          className="form-control MerchantInput"
                                          style={{
                                            border: "1px solid #3494E629",
                                          }}
                                          id="store_logo_store"
                                          data-bv-field="store_logo_store"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Counter_Name"
                                        defaultMessage="Counter Name"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        placeholder="Counter Name"
                                        value={counterName}
                                        onChange={onChangeCountrtName}
                                        name="Counter Name"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="Counter_Name"
                                        data-bv-field="Counter_Name"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="email"
                                        defaultMessage="Email Address"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        placeholder="Email Adress"
                                        value={email_StoreID}
                                        onChange={onChangeEmailStore_ID}
                                        name="email"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="email"
                                        data-bv-field="email"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Store_Password"
                                        defaultMessage="Store Password"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        type="password"
                                        placeholder="Store Password"
                                        value={store_password_store}
                                        onChange={onChangeStore_password}
                                        name="store_password_store"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="store_password_store"
                                        data-bv-field="store_password_store"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Location"
                                        defaultMessage="Location"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        placeholder="Address"
                                        value={address_store}
                                        onChange={onChangeAddress}
                                        name="address_store"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="address_store"
                                        data-bv-field="address_store"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  ></div>

                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <button
                                        className="btn btn-block"
                                        style={{
                                          borderRadius: "16px",
                                          color: "gray",
                                        }}
                                        onClick={handlePreviewMap}
                                      >
                                        Set Location
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {showMap && (
                                  <div className="row">
                                    <div
                                      className="col-lg-3 col-s-12"
                                      style={{ paddingTop: "35px" }}
                                    ></div>
                                    <div className="col-lg-9 col-s-12 pt-4">
                                      <div
                                        className="input-group"
                                        style={{ height: " 400px" }}
                                      >
                                        <Mapp />
                                      </div>
                                      <br />
                                      <button
                                        className="AddStore"
                                        onClick={handleLngLat}
                                        style={{ float: "right" }}
                                      >
                                        Confirm Location
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div
                                className="row"
                                style={{ justifyContent: "flex-end" }}
                              >
                                <div>
                                  <button
                                    onClick={handleCancelUpdate}
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      paddingTop: "15px",
                                      paddingRight: "20px",
                                    }}
                                  >
                                    <FormattedMessage
                                      id="Cancel"
                                      defaultMessage="Cancel"
                                    />
                                  </button>
                                </div>
                                <div style={{ width: "40%" }}>
                                  <button
                                    //  type="submit"
                                    className="btn btn-primary btn-block"
                                    style={{ borderRadius: "50px" }}
                                    onClick={handleUpdatePhysicalStore}
                                  >
                                    <FormattedMessage
                                      id="Update"
                                      defaultMessage="Update"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3) Update Online Store */}
                {updateOnlineStep && (
                  <div>
                    <h4>
                      <FormattedMessage
                        id="Your_Online_Store_Details"
                        defaultMessage="Your Online Store Details"
                      />
                    </h4>
                    <div className="col-lg-10 col-s-12 pt-4">
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12 mx-auto">
                          {!successful && (
                            <div>
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "18px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Category"
                                        defaultMessage="Category"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12">
                                    <FormControl
                                      variant="outlined"
                                      fullWidth
                                      //    className={classes.formControl}
                                      style={{ marginBottom: "3%" }}
                                      size="small"
                                      label="Reciever is"
                                      id="searchtype"
                                    >
                                      {/* <InputLabel id="transType">
                                        {categoryID}
                                      </InputLabel> */}

                                      <Select
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                          borderRadius: "16px",
                                          height: "52px",
                                        }}
                                        labelid="Category"
                                        id="demo-simple-select-filled"
                                        value={category_id_store}
                                        label="Category"
                                        onChange={onChangeCategoryId}
                                      >
                                        <MenuItem value="" key="">
                                          <em>
                                            <FormattedMessage
                                              id="None"
                                              defaultMessage="None"
                                            />
                                          </em>
                                        </MenuItem>
                                        {Categories.map((cat) => (
                                          <MenuItem
                                            key={cat && cat.id}
                                            value={cat && cat.id}
                                          >
                                            {cat && cat.name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="kyc_page_trade_license"
                                        defaultMessage="Trade License"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div
                                      className="input-group"
                                      style={{ flexFlow: "row" }}
                                    >
                                      {tradeLicenseView &&
                                      tradeLicenseView.endsWith("pdf") ? (
                                        <button
                                          className="AddStore"
                                          style={{ width: "150px" }}
                                          onClick={(e) =>
                                            downloadKycDocHandler(
                                              e,
                                              tradeLicenseView
                                            )
                                          }
                                        >
                                          <FormattedMessage
                                            id="Preview"
                                            defaultMessage="Preview"
                                          />
                                        </button>
                                      ) : (
                                        <button
                                          className="AddStore"
                                          style={{ width: "150px" }}
                                          onClick={handlePreview}
                                        >
                                          <FormattedMessage
                                            id="Preview"
                                            defaultMessage="Preview"
                                          />
                                        </button>
                                      )}

                                      <Modal
                                        className="ModalStyle"
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        open={open2}
                                        onClose={handleClose2}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                          timeout: 500,
                                        }}
                                      >
                                        <Fade in={open2}>
                                          <div className="row">
                                            <div className="col-md-9 col-lg-7 col-xl-3 mx-auto">
                                              <div
                                                className="bg-white text-center shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                                style={{
                                                  borderRadius: "16px",
                                                }}
                                              >
                                                <p
                                                  style={{
                                                    fontWeight: "500",
                                                    float: "right",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={handleClose2}
                                                >
                                                  X
                                                </p>
                                                <div className="my-4">
                                                  {tradeLicenseView ? (
                                                    <img
                                                      src={tradeLicenseView}
                                                      style={{ width: "100%" }}
                                                    />
                                                  ) : (
                                                    <img
                                                      src={NoImg}
                                                      style={{ width: "100%" }}
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Fade>
                                      </Modal>
                                      <span style={{ padding: "12px" }}>
                                        {" "}
                                        Or{" "}
                                      </span>
                                      <div className="input-group">
                                        <input
                                          multiple
                                          accept="image/*"
                                          ref={fileRef}
                                          type="file"
                                          placeholder="Upload trade license"
                                          onChange={onChangeTradeLicence}
                                          name="trade_license_store"
                                          className="form-control MerchantInput"
                                          style={{
                                            border: "1px solid #3494E629",
                                          }}
                                          id="trade_license_store"
                                          data-bv-field="trade_license_store"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Logo"
                                        defaultMessage="Logo"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    {logoView ? (
                                      <img src={logoView} width="70" />
                                    ) : (
                                      <img src={NoImg} width="70" />
                                    )}
                                  </div>
                                </div>
                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  ></div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div
                                      className="input-group"
                                      style={{ flexFlow: "row" }}
                                    >
                                      <p
                                        style={{
                                          cursor: "pointer",
                                          color: "#FC2861",
                                          paddingTop: "10px",
                                        }}
                                        onClick={(e) =>
                                          handleDeleteLogo(e, ConfigID)
                                        }
                                      >
                                        DELETE
                                      </p>{" "}
                                      <span style={{ padding: "12px" }}>
                                        {" "}
                                        Or{" "}
                                      </span>
                                      <div className="input-group">
                                        <input
                                          multiple
                                          accept="image/*"
                                          ref={fileRef}
                                          type="file"
                                          placeholder="Upload Logo"
                                          onChange={onChangeStoreLogo}
                                          name="store_logo_store"
                                          className="form-control MerchantInput"
                                          style={{
                                            border: "1px solid #3494E629",
                                          }}
                                          id="store_logo_store"
                                          data-bv-field="store_logo_store"
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Location"
                                        defaultMessage="Location"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        placeholder="Address"
                                        value={address_store}
                                        onChange={onChangeAddress}
                                        name="address_store"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="address_store"
                                        data-bv-field="address_store"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Store_URL"
                                        defaultMessage="Store URL"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        placeholder="Store URL"
                                        value={store_url_store}
                                        onChange={onChangeStore_url_store}
                                        name="store_url_store"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="store_url_store"
                                        data-bv-field="store_url_store"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Success_URL"
                                        defaultMessage="Success URL"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        placeholder="Success Url"
                                        value={success_url_store}
                                        onChange={onChangeSuccess_url}
                                        name="success_url_store"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="success_url_store"
                                        data-bv-field="success_url_store"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Cancel_URL"
                                        defaultMessage="Cancel URL"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        placeholder="Cancel Url"
                                        value={cancel_url_store}
                                        onChange={onChangeCancel_url}
                                        name="cancel_url_store"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="cancel_url_store"
                                        data-bv-field="cancel_url_store"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="IPN_URL"
                                        defaultMessage="IPN URL"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
                                    <div className="input-group">
                                      <input
                                        placeholder="Ipn Url"
                                        value={ipn_url_store}
                                        onChange={onChangeIpn_url}
                                        name="ipn_url_store"
                                        className="form-control MerchantInput"
                                        style={{
                                          border: "1px solid #3494E629",
                                        }}
                                        id="ipn_url_store"
                                        data-bv-field="ipn_url_store"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="row"
                                style={{ justifyContent: "flex-end" }}
                              >
                                <div>
                                  <button
                                    onClick={handleCancelUpdate}
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      paddingTop: "15px",
                                      paddingRight: "20px",
                                    }}
                                  >
                                    <FormattedMessage
                                      id="Cancel"
                                      defaultMessage="Cancel"
                                    />
                                  </button>
                                </div>
                                <div style={{ width: "40%" }}>
                                  <button
                                    //  type="submit"
                                    className="btn btn-primary btn-block"
                                    style={{ borderRadius: "50px" }}
                                    onClick={handleUpdateOnlineStore}
                                  >
                                    <FormattedMessage
                                      id="Update"
                                      defaultMessage="Update"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4) View Store */}
                {viewStep && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        paddingBottom: "10px",
                      }}
                    >
                      <h6
                        style={{
                          color: "#2D335B",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        <FormattedMessage
                          id="Store_Configuration"
                          defaultMessage="Store Configuration"
                        />
                      </h6>
                      <a href="/store/add-store" className="AddStore">
                        <FormattedMessage
                          id="add_new_store"
                          defaultMessage="ADD NEW STORE"
                        />
                      </a>
                      {/* <button className="AddStore"
                       onClick={addStore}
                      >
                        <FormattedMessage
                          id="add_new_store"
                          defaultMessage="ADD NEW STORE"
                        />
                      </button> */}
                    </div>

                    <table
                      className="table"
                      style={{
                        border: "1px solid #00000029",
                        borderRadius: "8px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">
                            <FormattedMessage
                              id="Store_ID"
                              defaultMessage="Store ID"
                            />
                          </th>
                          <th scope="col">
                            <FormattedMessage id="Type" defaultMessage="Type" />
                          </th>
                          <th scope="col">
                            <FormattedMessage
                              id="Store_Category"
                              defaultMessage="Store Category"
                            />
                          </th>
                          <th scope="col">
                            <FormattedMessage
                              id="Location"
                              defaultMessage="Location"
                            />
                          </th>
                          <th scope="col">
                            <FormattedMessage
                              id="Counter_Name"
                              defaultMessage="Counter Name"
                            />
                          </th>
                          <th scope="col">
                            <FormattedMessage
                              id="limits_page_action"
                              defaultMessage="Action"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allconfig.map((configss) => (
                          <tr key={configss.store_id}>
                            <th scope="row">
                              <div style={{ paddingTop: "20px" }}>
                                {configss.store_id}
                              </div>
                            </th>
                            <td>
                              <small
                                id="myP"
                                style={{
                                  fontSize: "14px",
                                  padding: "7px",
                                }}
                              >
                                <div>{configss.type}</div>
                              </small>
                            </td>

                            <td>
                              <small
                                id="myP"
                                style={{
                                  fontSize: "14px",
                                  padding: "7px",
                                }}
                              >
                                <div>
                                  {configss.store_category &&
                                    configss.store_category.text}
                                </div>
                              </small>
                            </td>

                            <td>
                              <small
                                id="myP"
                                style={{
                                  fontSize: "14px",
                                  padding: "7px",
                                }}
                              >
                                <div>{configss.address}</div>
                              </small>
                            </td>

                            <td>
                              <small
                                id="myP"
                                style={{
                                  fontSize: "14px",
                                  padding: "7px",
                                }}
                              >
                                <div>
                                  {configss.counter_name
                                    ? configss.counter_name
                                    : "N/A"}
                                </div>
                              </small>
                            </td>

                            <td>
                              {configss.type === "Offline" ? (
                                <button
                                  className="NextStore"
                                  style={{
                                    borderRadius: "50px",
                                    width: "90px",
                                    height: "37px",
                                    marginTop: "15px",
                                  }}
                                  onClick={(e) =>
                                    ViewStore(
                                      e,
                                      configss.id,
                                      configss.store_id,
                                      configss.type,
                                      configss.store_category &&
                                        configss.store_category.id,
                                      configss.store_category &&
                                        configss.store_category.text,
                                      configss.trade_license,
                                      configss.store_logo,
                                      configss.address,
                                      configss.counter_name,
                                      configss.latitude,
                                      configss.longitude,
                                      configss.qr
                                    )
                                  }
                                >
                                  <FormattedMessage
                                    id="View"
                                    defaultMessage="View"
                                  />
                                </button>
                              ) : (
                                <button
                                  className="NextStore"
                                  style={{
                                    borderRadius: "50px",
                                    width: "90px",
                                    height: "37px",
                                    marginTop: "15px",
                                  }}
                                  onClick={(e) =>
                                    ViewOnlineStore(
                                      e,
                                      configss.id,
                                      configss.store_id,
                                      configss.type,
                                      configss.store_category &&
                                        configss.store_category.id,
                                      configss.trade_license,
                                      configss.store_logo,
                                      configss.address,
                                      configss.store_url,
                                      configss.ipn_url,
                                      configss.success_url,
                                      configss.cancel_url,
                                      configss.store_category &&
                                        configss.store_category.text
                                    )
                                  }
                                >
                                  <FormattedMessage
                                    id="View"
                                    defaultMessage="View"
                                  />
                                </button>
                              )}
                              <span>{"  "}</span>
                              {configss.type === "Offline" ? (
                                <button
                                  onClick={(e) =>
                                    UpdateView(
                                      e,
                                      configss.id,
                                      configss.type,
                                      configss.store_category &&
                                        configss.store_category.id,
                                      configss.trade_license,
                                      configss.store_logo,
                                      configss.address,
                                      configss.counter_name,
                                      configss.latitude,
                                      configss.longitude,
                                      configss.store_id
                                    )
                                  }
                                  className="NextStore"
                                  style={{
                                    borderRadius: "50px",
                                    width: "90px",
                                    height: "37px",
                                    marginTop: "15px",
                                  }}
                                >
                                  <FormattedMessage
                                    id="Edit"
                                    defaultMessage="Edit"
                                  />{" "}
                                </button>
                              ) : (
                                <button
                                  onClick={(e) =>
                                    UpdateOnlineView(
                                      e,
                                      configss.id,
                                      //    configss.store_id,
                                      configss.type,
                                      configss.store_category &&
                                        configss.store_category.id,
                                      configss.trade_license,
                                      configss.store_logo,
                                      configss.address,
                                      configss.store_url,
                                      configss.ipn_url,
                                      configss.success_url,
                                      configss.cancel_url
                                    )
                                  }
                                  className="NextStore"
                                  style={{
                                    borderRadius: "50px",
                                    width: "90px",
                                    height: "37px",
                                    marginTop: "15px",
                                  }}
                                >
                                  <FormattedMessage
                                    id="Edit"
                                    defaultMessage="Edit"
                                  />{" "}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                
                    <TablePagination
              component="div"
              count={totalRows}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPageOptions={[10]}
            />

                  </div>
                )}

                {/* 5) View Physical Store */}
                {viewStoreDetails && (
                  <div>
                    <h4>
                      <FormattedMessage
                        id="Your_Physical_Store_Details"
                        defaultMessage="Your Physical Store Details"
                      />
                    </h4>
                    <div className="col-lg-10 col-s-12 pt-4">
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12 mx-auto">
                          {!successful && (
                            <div>
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "18px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Store_ID"
                                        defaultMessage="Store ID"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "18px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {email_StoreID}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "18px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Category"
                                        defaultMessage="Category"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "18px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {categoryText}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="kyc_page_trade_license"
                                        defaultMessage="Trade License"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-6 col-s-12 pt-4">
                                    <img src={tradeLicenseView} width="50" />
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Logo"
                                        defaultMessage="Logo"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-6 col-s-12 pt-4">
                                    <img src={logoView} width="50" />
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Counter_Name"
                                        defaultMessage="Counter Name"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {counterName}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Location"
                                        defaultMessage="Location"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {addressView}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="QR_Code"
                                        defaultMessage="QR Code"
                                      />
                                    </h6>
                                  </div>

                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {qr_Cod ? (
                                      <>
                                        <div className="divQR">
                                          <QRCode
                                            id="QR-Code-Physical"
                                            value={qr_Cod}
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
                                              width: "200px",
                                              float: "left",
                                              borderRadius: "50px",
                                              marginRight: "auto",
                                              marginTop: "15px",
                                              border: "1px solid red",
                                              color: "red",
                                              boxShadow: "none",
                                            }}
                                          >
                                            <FormattedMessage
                                              id="download_qr_code"
                                              defaultMessage="Download"
                                            />
                                          </a>
                                        </div>
                                      </>
                                    ) : (
                                      "N/A"
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div
                                className="row"
                                style={{ justifyContent: "flex-end" }}
                              >
                                <div>
                                  <button
                                    onClick={handleBackBtn}
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      paddingTop: "15px",
                                      paddingRight: "20px",
                                    }}
                                  >
                                    <FormattedMessage
                                      id="app_common_back"
                                      defaultMessage="Back"
                                    />
                                  </button>
                                </div>
                                <div style={{ width: "40%" }}>
                                  <button
                                    className="btn btn-primary btn-block"
                                    style={{ borderRadius: "50px" }}
                                    onClick={(e) =>
                                      UpdateView(
                                        e,
                                        ConfigID,
                                        //     storeID,
                                        storeType,
                                        categoryID,
                                        tradeLicenseView,
                                        logoView,
                                        addressView,
                                        counterName,
                                        latValue,
                                        lngValue,
                                        email_StoreID
                                      )
                                    }
                                  >
                                    <FormattedMessage
                                      id="Edit"
                                      defaultMessage="Edit"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6) View Online Store */}
                {viewOnlineStoreDetails && (
                  <div>
                    <h4>
                      <FormattedMessage
                        id="Your_Online_Store_Details"
                        defaultMessage="Your Online Store Details"
                      />
                    </h4>
                    <div className="col-lg-10 col-s-12 pt-4">
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12 mx-auto">
                          {!successful && (
                            <div>
                              <div
                                className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                style={{ borderRadius: "16px" }}
                              >
                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "18px" }}
                                  >
                                    <h6>
                                      {" "}
                                      <FormattedMessage
                                        id="Store_ID"
                                        defaultMessage="Store ID"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "18px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {storeID}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "18px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Category"
                                        defaultMessage="Category"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "18px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {categoryText}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="kyc_page_trade_license"
                                        defaultMessage="Trade License"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-6 col-s-12 pt-4">
                                    <img src={tradeLicenseView} width="50" />
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Logo"
                                        defaultMessage="Logo"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-6 col-s-12 pt-4">
                                    <img src={logoView} width="50" />
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Location"
                                        defaultMessage="Location"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {addressView}
                                  </div>
                                </div>
                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Store_URL"
                                        defaultMessage="Store URL"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {storeUrl}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Success_URL"
                                        defaultMessage="Success URL"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {successUrl}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="Cancel_URL"
                                        defaultMessage="Cancel URL"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {cancelUrl}
                                  </div>
                                </div>

                                <div className="row">
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      <FormattedMessage
                                        id="IPN_URL"
                                        defaultMessage="IPN URL"
                                      />
                                    </h6>
                                  </div>
                                  <div
                                    className="col-lg-6 col-s-12"
                                    style={{
                                      paddingTop: "35px",
                                      color: "#595C80",
                                    }}
                                  >
                                    {ipnUrl}
                                  </div>
                                </div>
                              </div>

                              <div
                                className="row"
                                style={{ justifyContent: "flex-end" }}
                              >
                                <div>
                                  <button
                                    onClick={handleBackBtn}
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      paddingTop: "15px",
                                      paddingRight: "20px",
                                    }}
                                  >
                                    <FormattedMessage
                                      id="app_common_back"
                                      defaultMessage="Back"
                                    />
                                  </button>
                                </div>
                                <div style={{ width: "40%" }}>
                                  <button
                                    className="btn btn-primary btn-block"
                                    style={{ borderRadius: "50px" }}
                                    onClick={(e) =>
                                      UpdateOnlineView(
                                        e,
                                        ConfigID,
                                        //    storeID,
                                        storeType,
                                        categoryID,
                                        tradeLicenseView,
                                        logoView,
                                        addressView,
                                        storeUrl,
                                        ipnUrl,
                                        successUrl,
                                        cancelUrl
                                      )
                                    }
                                  >
                                    <FormattedMessage
                                      id="Edit"
                                      defaultMessage="Edit"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <MobileView />
    </React.Fragment>
  );
}
