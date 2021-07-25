import React, { useEffect, useState } from "react";
//import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import WithdrawICON from "../assets/images/withdraw.svg";
import CurrencyExchange from "../assets/images/Currency Exchange.svg";
import receivedICON from "../assets/images/received.svg";
import Logo from "../assets/images/logo.png";
// import { QRNormal } from "react-qrbtf";
import QRCode from "qrcode.react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Cookies from "js-cookie";

SwiperCore.use([Pagination, Autoplay]);

export default function SideBar() {
  let history = useHistory();

  const [basicUserIfo, setBasicUserIfo] = useState("");

  const downloadQR = () => {
    const canvas = document.getElementById("QR-Code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QR-Code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {

    UserService.getUserBasicInfo().then(
      (response) => {
        if (response && response.data && response.data.code === 200) {
          setBasicUserIfo(response && response.data && response.data.data && response.data.data.user);
        } 
      },
      (error) => {
        if (
          error.response &&
          error.response.status === 401
        ) {
          Cookies.remove("Mtoken");
          localStorage.clear();
          history.push("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  return (
    <React.Fragment>
      {/* For Desktop */}
      <aside className="asideDesktopView asideDesktopView">
        <div
          className="bg-white shadow-md p-4 mb-3 gradientBalance"
          style={{ borderRadius: "8px" }}
        >
          <div style={{ marginTop: "10px" }}>
            <small
              className="font-weight-500"
              style={{ color: "#ffff", fontSize: "24px" }}
            >
              <FormattedMessage
                id="Account-Balance"
                defaultMessage="Account Balance"
              />
            </small>
            <br />
            <div style={{ marginTop: "30px" }}>
              <small
                className="font-weight-500"
                style={{ color: "#ffff", fontSize: "44px" }}
              >
                <div className="balanceStyle">
                  {basicUserIfo &&
                    basicUserIfo.available_balance &&
                    basicUserIfo.available_balance[0].currency}{" "}
                  {basicUserIfo &&
                    basicUserIfo.available_balance &&
                    basicUserIfo.available_balance[0].balance}
                </div>
              </small>
            </div>
          </div>
          <div className="d-flex accountStyle">
            <p className="mr-auto" style={{ whiteSpace: 'nowrap' }}>
              <FormattedMessage id="Account-No" defaultMessage="Account No." />
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p className="mr-auto">
              {/* {localStorage.getItem("accountNo")} */}
              {basicUserIfo &&
                basicUserIfo.available_balance &&
                basicUserIfo.available_balance[0].account_no}
            </p>
          </div>
        </div>

        <div
          className="bg-white shadow-md p-3 mb-3"
          style={{ display: "inline-flex", width: "100%", borderRadius: "8px" }}
        >
          <div className="divICON">
            <img src={WithdrawICON} alt="" style={{ paddingTop: "12px" }} />
          </div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <FormattedMessage
              id="home_page_withdraw"
              defaultMessage="Withdraw"
            />
            <br />
            <h6 style={{ color: "#fc2861", fontWeight: "bold" }}>
              IQD{" "}
              {basicUserIfo &&
                basicUserIfo.summary &&
                basicUserIfo.summary.withdrawn}
            </h6>
          </div>
        </div>

        <div
          className="bg-white shadow-md p-3 mb-3"
          style={{ display: "inline-flex", width: "100%", borderRadius: "8px" }}
        >
          <div className="divICON">
            <img src={CurrencyExchange} alt="" style={{ paddingTop: "12px" }} />
          </div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <FormattedMessage id="refund_page_refund" defaultMessage="Refund" />
            <br />
            <h6 style={{ color: "#fc2861", fontWeight: "bold" }}>
              IQD{" "}
              {basicUserIfo &&
                basicUserIfo.summary &&
                basicUserIfo.summary.refund}
            </h6>
          </div>
        </div>

        <div
          className="bg-white shadow-md rounded p-3 mb-3"
          style={{ display: "inline-flex", width: "100%" }}
        >
          <div className="divICON">
            <img src={receivedICON} alt="" style={{ paddingTop: "12px" }} />
          </div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <FormattedMessage
              id="Received-Payment"
              defaultMessage="Received Payment"
            />
            <br />
            <h6 style={{ color: "#1DBF73", fontWeight: "bold" }}>
              IQD{" "}
              {basicUserIfo &&
                basicUserIfo.summary &&
                basicUserIfo.summary.received_payment}
            </h6>
          </div>
        </div>

        <div
          className="bg-white shadow-md p-3 mb-3"
          style={{ display: "inline-flex", width: "100%", borderRadius: "8px" }}
        >
          <div className="row">
            <div
              className="col-MDD-6 col-SL-12"
              style={{ paddingLeft: "10px", paddingRight: "5px" }}
            >
              <div className="divQR">
                {/* {localStorage.getItem("qrCode") ? ( */}
                {basicUserIfo.qr_code_text ? (
                  <QRCode
                    id="QR-Code"
                    //  value={localStorage.getItem("qrCode")}
                    value={basicUserIfo.qr_code_text}
                    bgColor="#F0F6FA"
                    size={165}
                    level={"H"}
                    includeMargin={true}
                    //   renderAs={"canvas"}
                    //   renderAs={"svg"}
                    // imageSettings={{
                    //   src: basicUserIfo.profile_thumbnail,
                    //   x: null,
                    //   y: null,
                    //   height: 35,
                    //   width: 35,
                    //   excavate: true,
                    // }}
                  />
                ) : null}

                {/* <QRNormal value={localStorage.getItem("qrCode")} /> */}
                <img src={Logo} alt="" width={50} />
              </div>
            </div>
            <div
              className="col-MDD-6 col-SL-12"
              style={{ paddingLeft: "10px", paddingRight: "45px" }}
            >
              <div>
                <p>
                  <FormattedMessage
                    id="Personalised-QR"
                    defaultMessage="Personalised QR CODE"
                  />
                </p>
                <small style={{ fontWeight: "bold", fontSize: "14px" }}>
                  <FormattedMessage id="Details" defaultMessage="Details" />:
                </small>{" "}
                <br />
                <small style={{ fontSize: "12px" }}>
                  {/* {localStorage.getItem("MfirstName")}  {localStorage.getItem("MlasttName")} */}
                  {basicUserIfo.first_name} {basicUserIfo.last_name}
                </small>{" "}
                <br />
                <small style={{ fontSize: "12px" }}>
                  {/* {localStorage.getItem("MmobileNo")} */}
                  {basicUserIfo.mobile_number}
                </small>
                <br />
                <div style={{ paddingTop: "5px", paddingBottom: "9px" }}>
                  <small style={{ fontWeight: "bold", fontSize: "14px" }}>
                    <FormattedMessage
                      id="Account-Type"
                      defaultMessage="Account Type"
                    />
                  </small>{" "}
                  <br />
                  <small style={{ fontSize: "12px" }}>
                    {/* {localStorage.getItem("accountType")} */}
                    {basicUserIfo &&
                      basicUserIfo.available_balance &&
                      basicUserIfo.available_balance[0].account_type}
                  </small>
                </div>
                <div>
                  <a
                    onClick={downloadQR}
                    href="#"
                    className="btn btn-sm"
                    style={{
                      borderRadius: "50px",
                      marginRight: "auto",
                      border: "2px solid red",
                      color: "red",
                      fontWeight: "bold",
                      boxShadow: "none",
                    }}
                  >
                    <FormattedMessage
                      id="download_qr_code"
                      defaultMessage="Download"
                    />
                  </a>{" "}
                  <span></span>
                  
                  {/* <a
                    //    id="upload"
                    //    onClick={shareQR}
                    href="#"
                    className="btn btn-sm"
                    style={{
                      borderRadius: "50px",
                      border: "2px solid red",
                      color: "red",
                      fontWeight: "bold",
                      marginLeft: "auto",
                      boxShadow: "none",
                    }}
                  >
                    <FormattedMessage
                      id="share_qr_code"
                      defaultMessage="Share"
                    />
                  </a> */}
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
      </aside>

      {/* For Tablet */}
      <aside className="asideTabView">
        <div className="container-fluid">
          <div style={{ display: "flex" }}>
            <div className="swiperSlider" style={{ width: "100%" }}>
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide>
                  <div
                    className="bg-white shadow-md p-4 mb-3 gradientBalance"
                    style={{
                      borderRadius: "8px",
                      margin: "0 5px",
                      width: "100%",
                      height: "290px",
                    }}
                  >
                    <div style={{ marginTop: "10px" }}>
                      <small
                        className="font-weight-500"
                        style={{ color: "#ffff", fontSize: "24px" }}
                      >
                        <FormattedMessage
                          id="Account-Balance"
                          defaultMessage="Account Balance"
                        />
                      </small>
                      <br />
                      <div style={{ marginTop: "30px" }}>
                        <small
                          className="font-weight-500"
                          style={{ color: "#ffff", fontSize: "44px" }}
                        >
                          <div className="balanceStyle">
                            {basicUserIfo &&
                              basicUserIfo.available_balance &&
                              basicUserIfo.available_balance[0].currency}{" "}
                            {basicUserIfo &&
                              basicUserIfo.available_balance &&
                              basicUserIfo.available_balance[0].balance}
                          </div>
                        </small>
                      </div>
                    </div>
                    <div
                      className="d-flex"
                      style={{ paddingTop: "25%", fontSize: "20px" }}
                    >
                      <p className="mr-auto" style={{ whiteSpace: 'nowrap' }}>
                        <FormattedMessage
                          id="Account-No"
                          defaultMessage="Account No."
                        />
                      </p>
                      <p>
                        {/* {localStorage.getItem("accountNo")} */}
                        {basicUserIfo &&
                          basicUserIfo.available_balance &&
                          basicUserIfo.available_balance[0].account_no}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div
                    className="bg-white shadow-md p-3 mb-3"
                    style={{
                      display: "inline-flex",
                      borderRadius: "8px",
                      margin: "0 5px",
                      width: "100%",
                    }}
                  >
                    <div className="divICON">
                      <img
                        src={WithdrawICON}
                        alt=""
                        style={{ paddingTop: "12px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "20px" }}>
                      <FormattedMessage
                        id="home_page_withdraw"
                        defaultMessage="Withdraw"
                      />
                      <br />
                      <h6 style={{ color: "#fc2861", fontWeight: "bold" }}>
                        IQD{" "}
                        {basicUserIfo &&
                          basicUserIfo.summary &&
                          basicUserIfo.summary.withdrawn}
                      </h6>
                    </div>
                  </div>

                  <div
                    className="bg-white shadow-md p-3 mb-3"
                    style={{
                      display: "inline-flex",
                      borderRadius: "8px",
                      margin: "0 5px",
                      width: "100%",
                    }}
                  >
                    <div className="divICON">
                      <img
                        src={CurrencyExchange}
                        alt=""
                        style={{ paddingTop: "12px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "20px" }}>
                      <FormattedMessage
                        id="refund_page_refund"
                        defaultMessage="Refund"
                      />
                      <br />
                      <h6 style={{ color: "#fc2861", fontWeight: "bold" }}>
                        IQD{" "}
                        {basicUserIfo &&
                          basicUserIfo.summary &&
                          basicUserIfo.summary.refund}
                      </h6>
                    </div>
                  </div>

                  <div
                    className="bg-white shadow-md rounded p-3 mb-3"
                    style={{
                      display: "inline-flex",
                      margin: "0 5px",
                      width: "100%",
                    }}
                  >
                    <div className="divICON">
                      <img
                        src={receivedICON}
                        alt=""
                        style={{ paddingTop: "12px" }}
                      />
                    </div>
                    <div style={{ paddingLeft: "20px" }}>
                      <FormattedMessage
                        id="Received-Payment"
                        defaultMessage="Received Payment"
                      />
                      <br />
                      <h6 style={{ color: "#1DBF73", fontWeight: "bold" }}>
                        IQD{" "}
                        {basicUserIfo &&
                          basicUserIfo.summary &&
                          basicUserIfo.summary.received_payment}
                      </h6>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  {" "}
                  <div
                    className="bg-white shadow-md p-3 mb-3"
                    style={{
                      display: "inline-flex",
                      width: "100%",
                      borderRadius: "8px",
                      margin: "0 5px",
                      height: "290px",
                    }}
                  >
                    <div className="divQR">
                      {/* {localStorage.getItem("qrCode") ? ( */}
                      {basicUserIfo.qr_code_text ? (
                        <QRCode
                          id="QR-Code"
                          //  value={localStorage.getItem("qrCode")}
                          value={basicUserIfo.qr_code_text}
                          bgColor="#F0F6FA"
                          size={153}
                          level={"H"}
                          includeMargin={true}
                          //  renderAs={"canvas"}
                          //   renderAs={"svg"}
                          // imageSettings={{
                          //   src: basicUserIfo.profile_thumbnail,
                          //   x: null,
                          //   y: null,
                          //   height: 35,
                          //   width: 35,
                          //   excavate: true,
                          // }}
                        />
                      ) : null}

                      {/* <QRNormal value={localStorage.getItem("qrCode")} /> */}
                      <img src={Logo} alt="" width={50} />

                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <a
                          onClick={downloadQR}
                          href="#"
                          className="btn btn-sm"
                          style={{
                            borderRadius: "50px",
                            marginRight: "auto",
                            marginTop: "30px",
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
                        {/* <a
                          //    id="upload"
                          //    onClick={shareQR}
                          href="#"
                          className="btn btn-sm"
                          style={{
                            borderRadius: "50px",
                            border: "1px solid red",
                            color: "red",
                            marginLeft: "auto",
                            marginTop: "30px",
                            boxShadow: "none",
                          }}
                        >
                          <FormattedMessage 
                            id="share_qr_code"
                            defaultMessage="Share"
                          />
                        </a> */}
                      </div>
                    </div>
                    <br />
                    <div style={{ paddingLeft: "5px" }}>
                      <p>
                        <FormattedMessage
                          id="Personalised-QR"
                          defaultMessage="Personalised QR CODE"
                        />
                      </p>
                      <small style={{ fontWeight: "bold", fontSize: "14px" }}>
                        <FormattedMessage
                          id="Details"
                          defaultMessage="Details:"
                        />
                      </small>{" "}
                      <br />
                      <small style={{ fontSize: "12px" }}>
                        {/* {localStorage.getItem("MfirstName")}  {localStorage.getItem("MlasttName")} */}
                        {basicUserIfo.first_name} {basicUserIfo.last_name}
                      </small>{" "}
                      <br />
                      <small style={{ fontSize: "12px" }}>
                        {/* {localStorage.getItem("MmobileNo")} */}
                        {basicUserIfo.mobile_number}
                      </small>
                      <br />
                      <div style={{ paddingTop: "5px", paddingBottom: "9px" }}>
                        <small style={{ fontWeight: "bold", fontSize: "14px" }}>
                          <FormattedMessage
                            id="Account-Type"
                            defaultMessage="Account Type"
                          />
                        </small>{" "}
                        <br />
                        <small style={{ fontSize: "12px" }}>
                          {/* {localStorage.getItem("accountType")} */}
                          {basicUserIfo &&
                            basicUserIfo.available_balance &&
                            basicUserIfo.available_balance[0].account_type}
                        </small>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}
