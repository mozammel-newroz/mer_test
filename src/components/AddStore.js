import React, { useEffect, useState, useRef } from "react";
import Shops from "../services/shops";
import Vnavbar from "./Vnavbar";
import SideBar from "./sidebar";
import MobileView from "./MobileView";
import { FormattedMessage } from "react-intl";
import physicalStore from "../assets/images/physical store.svg";
import onlineStore from "../assets/images/online_store.svg";
import Footer from "./Footer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
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
import Navbar from "./Navbar";
import Mapp from "./Map";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddStore() {
  let history = useHistory();

  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [FailedStep, setFailedStep] = useState(false);
  const [chooseStoreType, setChooseStoreType] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [PhysicalStoreDiv, setPhysicalStoreDiv] = useState(false);
  const [OnlineStoreDiv, setOnlineStoreDiv] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [category_id_store, setCategory_id_store] = useState("");
  const [trade_license_store, setTrade_license_store] = useState(null);
  const [store_logo_store, setStore_logo_store] = useState(null);
  const [address_store, setAddress_store] = useState("");
  const [counterName, setCounterName] = useState("");
  const [store_url_store, setStore_url_store] = useState("");
  const [ipn_url_store, setIpn_url_store] = useState("");
  const [success_url_store, setSuccess_url_store] = useState("");
  const [cancel_url_store, setCancel_url_store] = useState("");
  const [store_password_store, setStore_password_store] = useState("");
  const [lngValue, setLngValue] = useState("");
  const [latValue, setLatValue] = useState("");
  const [storeID, setStoreID] = useState("");

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
  }, []);

  const handleLngLat = () => {
    setLngValue(localStorage.getItem("lng"));
    setLatValue(localStorage.getItem("lat"));
    setOpen3(true);
  };

  const handlePreviewMap = () => {
    setShowMap(!showMap);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
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

  const onChangeCountrtName = (e) => {
    setCounterName(e.target.value);
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

  const onChangeStore_password = (e) => {
    setStore_password_store(e.target.value);
  };

  const onChangeStore_ID = (e) => {
    setStoreID(e.target.value);
  };

  const onChangeStore_url_store = (e) => {
    setStore_url_store(e.target.value);
  };

  const ViewConfigList = () => {
    history.push("/store");
  };

  const handleCancelAdd = () => {
    setChooseStoreType(true);
    setPhysicalStoreDiv(false);
    setOnlineStoreDiv(false);
    setPhysicalStoreDiv(false);
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAddOnlineStore = async (e) => {
    e.preventDefault();

    setMessage([]);
    setSuccessful(false);
    setLoading(true);

    const formdata = new FormData();
    formdata.append("shop_type_id", 1);
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
    formdata.append("store_password", store_password_store);

    const userr = Cookies.getJSON("Mtoken");

    let res = await axios({
      url: `${hostAPI.getHost()}api/v1/private/user/store/store-configuration`,
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
      setMessage(res.data.messages);
      setOpen(true);
      setSuccessful(true);
      setFailedStep(false);
    } else {
      setMessage(res.data.messages);
      setOpen(true);
      setSuccessful(false);
      setLoading(false);
      setFailedStep(true);
    }
  };

  const handleAddPhysicalStore = async (e) => {
    e.preventDefault();

    setMessage([]);
    setSuccessful(false);
    setLoading(true);

    const formdata = new FormData();
    formdata.append("shop_type_id", 2);
    formdata.append("category_id", category_id_store);
    if (trade_license_store !== null) {
      formdata.append("trade_license", trade_license_store);
    }
    if (store_logo_store !== null) {
      formdata.append("store_logo", store_logo_store);
    }

    formdata.append("address", address_store);
    formdata.append("counter_name", counterName);
    formdata.append("password", store_password_store);
    formdata.append("store_id", storeID);
    formdata.append("lng", lngValue);
    formdata.append("lat", latValue);

    const userr = Cookies.getJSON("Mtoken");

    let res = await axios({
      url: `${hostAPI.getHost()}api/v1/private/user/store/physical-shop/create`,
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
      setMessage(res.data.messages);
      setOpen1(true);
      setSuccessful(true);
      setFailedStep(false);
      history.push("/store");
    } else {
      setMessage(res.data.messages);
      setOpen1(true);
      setSuccessful(false);
      setLoading(false);
      setFailedStep(true);
    }
  };

  const handleSubmit = (e) => {
    if (selectedOption === "OnlineStore") {
      setOnlineStoreDiv(true);
      setChooseStoreType(false);
    } else if (selectedOption === "PhysicalStore") {
      setPhysicalStoreDiv(true);
      setChooseStoreType(false);
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
                  open={open3}
                  autoHideDuration={3000}
                  onClose={handleClose3}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert onClose={handleClose3} severity="success">
                    Location confirmed successfully
                  </Alert>
                </Snackbar>

                {/* 2) Choose Store Type */}
                {chooseStoreType && (
                  <div className="col-lg-12 col-s-12 pt-4">
                    <div id="content" style={{ paddingTop: "13%" }}>
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12 mx-auto">
                          <div
                            className="bg-white shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                            style={{ borderRadius: "16px" }}
                          >
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              <FormattedMessage
                                id="Add_store"
                                defaultMessage="Add a store"
                              />
                            </p>
                            <div className="row">
                              <div className="col-6">
                                <div
                                  className="bg-white shadow-md p-3 pt-sm-4 px-sm-5 mb-4 text-center"
                                  style={{ borderRadius: "16px" }}
                                >
                                  <div className="form-group">
                                    <div className="">
                                      <div
                                        className="custom-control custom-radio"
                                        style={{ paddingLeft: "0" }}
                                      >
                                        <input
                                          name="Store"
                                          className="custom-control-input"
                                          id="PhysicalStore"
                                          value="PhysicalStore"
                                          type="radio"
                                          checked={
                                            selectedOption === "PhysicalStore"
                                          }
                                          onChange={handleChange}
                                        />

                                        <label
                                          className="custom-control-label"
                                          htmlFor="PhysicalStore"
                                        >
                                          <img
                                            src={physicalStore}
                                            style={{
                                              paddingTop: "40px",
                                              width: "150px",
                                            }}
                                          />
                                          <h6 style={{ paddingTop: "10px" }}>
                                            <FormattedMessage
                                              id="Physical_Store"
                                              defaultMessage="Physical Store"
                                            />
                                          </h6>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-6">
                                <div
                                  className="bg-white shadow-md p-3 pt-sm-4 px-sm-5 mb-4 text-center"
                                  style={{ borderRadius: "16px" }}
                                >
                                  <div className="form-group">
                                    <div className="">
                                      <div
                                        className="custom-control custom-radio"
                                        style={{ paddingLeft: "0" }}
                                      >
                                        <input
                                          name="Store"
                                          className="custom-control-input"
                                          id="OnlineStore"
                                          value="OnlineStore"
                                          type="radio"
                                          checked={
                                            selectedOption === "OnlineStore"
                                          }
                                          onChange={handleChange}
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="OnlineStore"
                                        >
                                          <img
                                            src={onlineStore}
                                            style={{
                                              paddingTop: "40px",
                                              width: "165px",
                                            }}
                                          />

                                          <h6 style={{ paddingTop: "20px" }}>
                                            <FormattedMessage
                                              id="Online_Store"
                                              defaultMessage="Online Store"
                                            />
                                          </h6>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <button
                                className="NextStore"
                                id="btn"
                                onClick={handleSubmit}
                              >
                                <FormattedMessage
                                  id="app_common_next"
                                  defaultMessage="Next"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3) Add Online Store */}
                {OnlineStoreDiv && (
                  <div>
                    <h4>
                      <FormattedMessage
                        id="Add_Online_Store"
                        defaultMessage="Add Your Online Store"
                      />
                    </h4>
                    <div className="col-lg-10 col-s-12 pt-4">
                      <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12 mx-auto">
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
                                  style={{ marginBottom: "3%" }}
                                  size="small"
                                  label="Reciever is"
                                  id="searchtype"
                                >
                                  <InputLabel id="transType">
                                    <FormattedMessage
                                      id="Select_Category"
                                      defaultMessage="Select a Category"
                                    />
                                  </InputLabel>

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
                                <div className="input-group">
                                  <input
                                    accept="image/*"
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
                                    placeholder="Erbil Iraq"
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
                                    placeholder="Enter store url"
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
                                    placeholder="Enter success url"
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
                                    placeholder="Cancel URL"
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
                                    placeholder="IPN URL"
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
                          </div>

                          <div
                            className="row"
                            style={{ justifyContent: "flex-end" }}
                          >
                            <div>
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  paddingTop: "15px",
                                  paddingRight: "20px",
                                }}
                                onClick={handleCancelAdd}
                              >
                                <FormattedMessage
                                  id="Cancel"
                                  defaultMessage="Cancel"
                                />
                              </button>
                            </div>
                            <div style={{ width: "40%" }}>
                              <button
                                className="btn btn-primary btn-block"
                                style={{ borderRadius: "50px" }}
                                onClick={handleAddOnlineStore}
                              >
                                <FormattedMessage
                                  id="Continue"
                                  defaultMessage="Continue"
                                />
                              </button>

                              <Modal
                                className="ModalStyle"
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                  timeout: 500,
                                }}
                              >
                                <Fade in={open}>
                                  {message && (
                                    <div>
                                      {FailedStep && (
                                        <div id="fail">
                                          <div>
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
                                                    onClick={handleClose}
                                                  >
                                                    X
                                                  </p>
                                                  <div className="my-4">
                                                    <p className="text-danger text-20 line-height-07">
                                                      <i className="fas fa-times-circle"></i>
                                                    </p>
                                                    <p className="text-danger text-6 font-weight-500 line-height-08">
                                                      {message}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      {successful && (
                                        <div id="success">
                                          <div>
                                            <div className="row">
                                              <div className="col-md-9 col-lg-7 col-xl-3 mx-auto">
                                                <div
                                                  className="bg-white text-center shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                                  style={{
                                                    borderRadius: "16px",
                                                  }}
                                                >
                                                  <div className="my-4">
                                                    <p className="text-success text-20 line-height-07">
                                                      <i className="fas fa-check-circle"></i>
                                                    </p>
                                                    <p className="text-success text-6 font-weight-500 line-height-08">
                                                      {message}
                                                    </p>
                                                  </div>
                                                  <p className="text-3 mb-4">
                                                    <br />
                                                    <button
                                                      className="btn btn-primary"
                                                      onClick={ViewConfigList}
                                                    >
                                                      <FormattedMessage
                                                        id="View_Configuration_List"
                                                        defaultMessage="View Store Configuration List"
                                                      />
                                                    </button>
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
                                </Fade>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4) Add Physical Store */}
                {PhysicalStoreDiv && (
                  <div>
                    <h4>
                      <FormattedMessage
                        id="Add_Physical_Store"
                        defaultMessage="Add Your Physical Store"
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
                                      style={{ marginBottom: "3%" }}
                                      size="small"
                                      label="Reciever is"
                                      id="searchtype"
                                    >
                                      <InputLabel id="transType">
                                        <FormattedMessage
                                          id="Select_Category"
                                          defaultMessage="Select a Category"
                                        />
                                      </InputLabel>

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
                                      {" "}
                                      <FormattedMessage
                                        id="kyc_page_trade_license"
                                        defaultMessage="Trade License"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
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

                                <div className="row">
                                  <div
                                    className="col-lg-3 col-s-12"
                                    style={{ paddingTop: "35px" }}
                                  >
                                    <h6>
                                      {" "}
                                      <FormattedMessage
                                        id="Logo"
                                        defaultMessage="Logo"
                                      />
                                    </h6>
                                  </div>
                                  <div className="col-lg-9 col-s-12 pt-4">
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
                                        value={storeID}
                                        onChange={onChangeStore_ID}
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
                                        placeholder="Erbil Iraq"
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
                                        style={{ height: "400px" }}
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
                                    onClick={handleCancelAdd}
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
                                    className="btn btn-primary btn-block"
                                    style={{ borderRadius: "50px" }}
                                    onClick={handleAddPhysicalStore}
                                  >
                                    <FormattedMessage
                                      id="AddStore"
                                      defaultMessage="Add store"
                                    />
                                  </button>
                                  <Modal
                                    className="ModalStyle"
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open1}
                                    onClose={handleClose1}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                      timeout: 500,
                                    }}
                                  >
                                    <Fade in={open1}>
                                      {message && (
                                        <div>
                                          {FailedStep && (
                                            <div id="fail">
                                              <div>
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
                                                        onClick={handleClose1}
                                                      >
                                                        X
                                                      </p>
                                                      <div className="my-4">
                                                        <p className="text-danger text-20 line-height-07">
                                                          <i className="fas fa-times-circle"></i>
                                                        </p>
                                                        <p className="text-danger text-6 font-weight-500 line-height-08">
                                                          {message}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {successful && (
                                            <div id="success">
                                              <div>
                                                <div className="row">
                                                  <div className="col-md-9 col-lg-7 col-xl-3 mx-auto">
                                                    <div
                                                      className="bg-white text-center shadow-md p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4"
                                                      style={{
                                                        borderRadius: "16px",
                                                      }}
                                                    >
                                                      <div className="my-4">
                                                        <p className="text-success text-20 line-height-07">
                                                          <i className="fas fa-check-circle"></i>
                                                        </p>
                                                        <p className="text-success text-6 font-weight-500 line-height-08">
                                                          {message}
                                                        </p>
                                                      </div>
                                                      <p className="text-3 mb-4">
                                                        <br />
                                                        <button
                                                          className="btn btn-primary"
                                                          onClick={
                                                            ViewConfigList
                                                          }
                                                        >
                                                          <FormattedMessage
                                                            id="View_Configuration_List"
                                                            defaultMessage="View Store Configuration List"
                                                          />
                                                        </button>
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
                                    </Fade>
                                  </Modal>
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
