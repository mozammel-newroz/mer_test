import React, { useEffect, useState } from "react";
import Logo from "../assets/images/homelogo.svg";
import Mob2 from "../assets/images/appbg.png";
import Devices from "../assets/images/devices.png";
import client1 from "../assets/images/1.png";
import Fstar from "../assets/images/fStar.svg";
import Estar from "../assets/images/eStar.svg";
import shop from "../assets/images/shop.svg";
import businessman from "../assets/images/businessman.svg";
import seller from "../assets/images/seller.svg";
import group from "../assets/images/group.svg";
import Line from "../assets/images/line.svg";
import Qr from "../assets/images/qr.png";
import MapAgent from "../assets/images/map.png";
import appStore from "../assets/images/appstore.svg";
import googlePlayStore from "../assets/images/google.svg";
import MobileView from "./MobileView";
import $ from "jquery";
import Language from "./Language";
import { FormattedMessage } from "react-intl";
//import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Pagination, Autoplay]);

export default function Home(props) {
  //  const [auth, setAuth] = useState(false);

  let history = useHistory();

  useEffect(() => {
    // Preloader
    $(window).on("load", function () {
      $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
      $("#preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
      $("body").delay(333);
    });

    // const user = AuthService.getCurrentUser();
    // if (user) {
    //   setAuth(true);
    //   history.push("/dashboard");
    //   window.location.reload();
    //   // this.props.history.push("/login");
    //   // window.location.reload();
    // } else {
    //   setAuth(false);
    // //  return false;
    // }
  }, []);

  return (
    <React.Fragment>
      <div id="preloader">
        <div data-loader="dual-ring"></div>
      </div>

      {/* {!auth && ( */}

      <div id="main-wrapper" className="WebView">
        <header>
          <div className="header-row">
            <section className="hero-wrap" style={{ height: "955px" }}>
              <div className="hero-bg bgImg" style={{ height: "auto" }}>
                <div className="container" style={{ padding: "25px 0" }}>
                  <div
                    className="header-column justify-content-start"
                    style={{ display: "flex" }}
                  >
                    <div style={{ paddingTop: "3%" }}>
                      {" "}
                      <a href="/home" title="FastPay">
                        <img src={Logo} width="190" height="50" alt="fastpay" />
                      </a>{" "}
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                      <nav className="login-signup navbar navbar-expand">
                        <ul className="navbar-nav">
                          <li className="align-items-center h-auto ml-sm-3">
                            <a
                              className="btn"
                              style={{
                                borderRadius: "50px",
                                border: "2px solid #fff",
                                color: "#ffff",
                                width: "150px",
                              }}
                              href="/login"
                            >
                              <FormattedMessage
                                id="login_page_login_btn_text"
                                defaultMessage="Login"
                              />
                            </a>{" "}
                          </li>
                          <li className="align-items-center h-auto ml-sm-3">
                            <a
                              className="btn"
                              style={{
                                borderRadius: "50px",
                                border: "2px solid #fff",
                                color: "#ffff",
                                width: "150px",
                              }}
                              href="/signup"
                            >
                              <FormattedMessage
                                id="Sign_Up"
                                defaultMessage="Sign Up"
                              />
                            </a>
                          </li>
                          <li>
                            <Language />
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="row">
                    <div
                      className="col-md-6"
                      style={{ padding: "235px 115px 0 0" }}
                    >
                      <h3
                        style={{
                          color: "#fff",
                          lineHeight: "3rem",
                          fontWeight: "bold",
                          fontSize: "40px",
                          textTransform: "capitalize",
                        }}
                      >
                        <FormattedMessage
                          id="Register_Now"
                          defaultMessage="Receive Payment"
                        />
                        <br />
                        <span style={{ color: "#ffff" }}>
                          <FormattedMessage
                            id="single_click"
                            defaultMessage="With just a single click"
                          />
                        </span>{" "}
                      </h3>
                      <br />
                      <p
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          height: "104px",
                          fontSize: "14px",
                          lineHeight: "2rem",
                          overflow: "hidden",
                        }}
                      >
                        <FormattedMessage
                          id="single_click_desc"
                          defaultMessage="Phasellus risus turpis, pretium sit amet magna non,
                        molestie ultricies enim. Nullam pulvinar felis at metus
                        malesuada, nec convallis lacus commodo. Duis blandit
                        neque purus, nec auctor mi sollicitudin nec. Duis urna
                        ipsum, tincidunt at euismod ut, placerat eget urna.
                        Curabitur nec faucibus leo, et laoreet nibh.
                        Pellentesque euismod quam at eros efficitur, vitae
                        venenatis sem consectetur. Donec ut risus ultricies,
                        dictum neque at, bibendum purus. In hac habitasse platea
                        dictumst."
                        />
                      </p>
                      <a
                        className="btn"
                        style={{
                          borderRadius: "50px",
                          border: "2px solid #fff",
                          color: "#ffff",
                          width: "137px",
                        }}
                        href=""
                      >
                        <FormattedMessage
                          id="Explore"
                          defaultMessage="Explore"
                        />
                      </a>
                    </div>
                    <div
                      className="col-md-6"
                      style={{
                        padding: "160px 0px 0px 0px",
                        textAlign: "center",
                      }}
                    >
                      {/* <div className="bgImg2">
                        <img alt="" src={Mob} />
                      </div> */}

                      <div>
                        <img alt="" src={Mob2} style={{ width: "100%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </header>

        <div className="container">
          <div className="row" style={{ paddingTop: "90px" }}>
            <img src={Line} alt="" />
          </div>
          <div className="row">
            <div className="col-md-6" style={{ padding: "40px 120px 0 0" }}>
              <h3
                style={{
                  color: "#2D335B",
                  lineHeight: "3rem",
                  fontWeight: "bold",
                  fontSize: "40px",
                  textTransform: "capitalize",
                }}
              >
                <FormattedMessage
                  id="Best_Business"
                  defaultMessage="The Best Business"
                />
                <br />
                <span>
                  <FormattedMessage
                    id="Solution_for_you"
                    defaultMessage="Solution for you"
                  />
                </span>{" "}
              </h3>
              <br />
              <p
                style={{
                  color: "#2D335B",
                  fontWeight: "bold",
                  height: "155px",
                  fontSize: "14px",
                  lineHeight: "2rem",
                  overflow: "hidden",
                }}
              >
                <FormattedMessage
                  id="Solution_desc"
                  defaultMessage="Phasellus risus turpis, pretium sit amet magna non,
                        molestie ultricies enim. Nullam pulvinar felis at metus
                        malesuada, nec convallis lacus commodo. Duis blandit
                        neque purus, nec auctor mi sollicitudin nec. Duis urna
                        ipsum, tincidunt at euismod ut, placerat eget urna.
                        Curabitur nec faucibus leo, et laoreet nibh.
                        Pellentesque euismod quam at eros efficitur, vitae
                        venenatis sem consectetur. Donec ut risus ultricies,
                        dictum neque at, bibendum purus. In hac habitasse platea
                        dictumst."
                />
              </p>
            </div>

            <div className="col-md-6" style={{ padding: "40px 0px 0 0" }}>
              <div className="row" style={{ float: "right" }}>
                <div className="col-md-6">
                  <div
                    style={{
                      backgroundColor: "#DE7885",
                      borderRadius: "50px",
                      width: "70px",
                      height: "70px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={shop}
                      alt=""
                      style={{
                        width: "53px",
                        height: "53px",
                        paddingTop: "18px",
                      }}
                    />
                  </div>
                  <p className="merchntText">
                    <FormattedMessage
                      id="Physical_Online"
                      defaultMessage="Physical or Online shop We have got you covered"
                    />
                  </p>
                </div>
                <div className="col-md-6">
                  <div
                    style={{
                      backgroundColor: "#85C5C5",
                      borderRadius: "50px",
                      width: "70px",
                      height: "70px",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    <img
                      src={group}
                      alt=""
                      style={{
                        width: "53px",
                        height: "53px",
                        paddingTop: "18px",
                      }}
                    />
                  </div>

                  <p className="merchntText">
                    <FormattedMessage
                      id="Million_clients"
                      defaultMessage="300+ Million clients To reach"
                    />
                  </p>
                </div>
                <div className="col-md-6">
                  <div
                    style={{
                      backgroundColor: "#FFB86F",
                      borderRadius: "50px",
                      width: "70px",
                      height: "70px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={seller}
                      alt=""
                      style={{
                        width: "53px",
                        height: "53px",
                        paddingTop: "18px",
                      }}
                    />
                  </div>

                  <p className="merchntText">
                    <FormattedMessage
                      id="Agents_At_your_service"
                      defaultMessage="3+ Million Agents At your service"
                    />
                  </p>
                </div>
                <div className="col-md-6">
                  <div
                    style={{
                      backgroundColor: "#B08BF1",
                      borderRadius: "50px",
                      width: "70px",
                      height: "70px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={businessman}
                      alt=""
                      style={{
                        width: "53px",
                        height: "53px",
                        paddingTop: "18px",
                      }}
                    />
                  </div>

                  <p className="merchntText">
                    <FormattedMessage
                      id="Merchants_On_board"
                      defaultMessage="1+ Million Merchants On board"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{ justifyContent: "center", paddingTop: "80px" }}
          >
            <img src={Line} alt="" />
          </div>
          <div className="row" style={{ justifyContent: "center" }}>
            <h3
              style={{
                color: "#2D335B",
                lineHeight: "3rem",
                fontWeight: "bold",
                fontSize: "40px",
                textTransform: "capitalize",
                paddingTop: "20px",
              }}
            >
              <FormattedMessage
                id="Why_Choose_FastPay"
                defaultMessage="Why Choose FastPay?"
              />
            </h3>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div>
                <img
                  alt=""
                  src={Devices}
                  style={{ paddingTop: "40px", width: "100%" }}
                />
              </div>
            </div>

            <div
              className="col-md-6"
              style={{
                padding: "190px 0px 0px 90px",
              }}
            >
              <h3
                style={{
                  color: "#2D335B",
                  lineHeight: "3rem",
                  fontWeight: "bold",
                  fontSize: "39px",
                  textTransform: "capitalize",
                }}
              >
                <FormattedMessage
                  id="Solution_for_every_need"
                  defaultMessage="A Solution for every need"
                />
              </h3>
              <br />
              <p
                style={{
                  color: "#2D335B",
                  fontWeight: "bold",
                  height: "155px",
                  fontSize: "14px",
                  lineHeight: "2rem",
                  overflow: "hidden",
                }}
              >
                <FormattedMessage
                  id="Solution_for_every_need_Desc"
                  defaultMessage="Phasellus risus turpis, pretium sit amet magna non, molestie
                ultricies enim. Nullam pulvinar felis at metus malesuada, nec
                convallis lacus commodo. Duis blandit neque purus, nec auctor mi
                sollicitudin nec. Duis urna ipsum, tincidunt at euismod ut,
                placerat eget urna. Curabitur nec faucibus leo, et laoreet nibh.
                Pellentesque euismod quam at eros efficitur, vitae venenatis sem
                consectetur. Donec ut risus ultricies, dictum neque at, bibendum
                purus. In hac habitasse platea dictumst."
                />
              </p>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-6"
              style={{
                padding: "190px 0px 0px 90px",
              }}
            >
              <h3
                style={{
                  color: "#2D335B",
                  lineHeight: "3rem",
                  fontWeight: "bold",
                  fontSize: "40px",
                  textTransform: "capitalize",
                }}
              >
                Agents on Map
              </h3>
              <br />
              <p
                style={{
                  color: "#2D335B",
                  fontWeight: "bold",
                  height: "155px",
                  fontSize: "14px",
                  lineHeight: "2rem",
                  overflow: "hidden",
                }}
              >
                <FormattedMessage
                  id="Solution_for_every_need_Desc2"
                  defaultMessage="Phasellus risus turpis, pretium sit amet magna non, molestie
                ultricies enim. Nullam pulvinar felis at metus malesuada, nec
                convallis lacus commodo. Duis blandit neque purus, nec auctor mi
                sollicitudin nec. Duis urna ipsum, tincidunt at euismod ut,
                placerat eget urna. Curabitur nec faucibus leo, et laoreet nibh.
                Pellentesque euismod quam at eros efficitur, vitae venenatis sem
                consectetur. Donec ut risus ultricies, dictum neque at, bibendum
                purus. In hac habitasse platea dictumst."
                />
              </p>
            </div>

            <div className="col-md-6">
              <div>
                <img
                  alt=""
                  src={MapAgent}
                  style={{ paddingTop: "40px", width: "100%" }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div>
                <img
                  alt=""
                  src={Qr}
                  style={{ paddingTop: "40px", width: "100%" }}
                />
              </div>
            </div>

            <div
              className="col-md-6"
              style={{
                padding: "190px 0px 0px 90px",
              }}
            >
              <h3
                style={{
                  color: "#2D335B",
                  lineHeight: "3rem",
                  fontWeight: "bold",
                  fontSize: "40px",
                  textTransform: "capitalize",
                }}
              >
                <FormattedMessage
                  id="Accept_payment_via_QR"
                  defaultMessage="Accept payment via QR"
                />
              </h3>
              <br />
              <p
                style={{
                  color: "#2D335B",
                  fontWeight: "bold",
                  height: "155px",
                  fontSize: "14px",
                  lineHeight: "2rem",
                  overflow: "hidden",
                }}
              >
                <FormattedMessage
                  id="Solution_for_every_need_Desc3"
                  defaultMessage="Phasellus risus turpis, pretium sit amet magna non, molestie
                ultricies enim. Nullam pulvinar felis at metus malesuada, nec
                convallis lacus commodo. Duis blandit neque purus, nec auctor mi
                sollicitudin nec. Duis urna ipsum, tincidunt at euismod ut,
                placerat eget urna. Curabitur nec faucibus leo, et laoreet nibh.
                Pellentesque euismod quam at eros efficitur, vitae venenatis sem
                consectetur. Donec ut risus ultricies, dictum neque at, bibendum
                purus. In hac habitasse platea dictumst."
                />
              </p>
            </div>
          </div>
        </div>

        <section
          className="hero-wrap"
          style={{ height: "780px", marginTop: "50px" }}
        >
          <div className="hero-bg clientBg">
            <h3
              style={{
                color: "#fff",
                lineHeight: "3rem",
                fontWeight: "bold",
                fontSize: "40px",
                textAlign: "center",
                paddingTop: "190px",
                textTransform: "capitalize",
              }}
            >
              <FormattedMessage
                id="Our_clients_feedbacks"
                defaultMessage="Our clients feedbacks"
              />
            </h3>

            <div
              className="slideStyle"
              style={{ textAlign: "center", paddingTop: "80px" }}
            >
              <div className="swiperSlider" style={{ width: "100%" }}>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={3}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  <SwiperSlide>
                    <div
                      style={{
                        width: "290px",
                        height: "240px",
                        margin: "50px 19px 19px 19px",
                        borderRadius: "8px",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={client1}
                        alt=""
                        style={{
                          borderRadius: "50px",
                          width: "90px",
                          height: "90px",
                          marginTop: "-50px",
                        }}
                      />
                      <div>
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Estar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Estar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                      </div>
                      <div
                        style={{
                          textAlign: "justify",
                          padding: "30px",
                          overflow: "hidden",
                          height: "152px",
                        }}
                      >
                        <small>
                          <FormattedMessage
                            id="Our_clients_feedbacks_desc"
                            defaultMessage="Integer ac interdum lacus. Nunc porta semper lacus a
                          varius. Pellentesque habitant morbi tristique senectus
                          et netus et malesuada fames ac turpis egestas. Nunc
                          sagittis consectetur velit, ac gravida nunc gravida
                          et. Vestibulum at eros imperdiet, volutpat nunc vitae,
                          ornare erat. Proin interdum aliquet porta. Fusce ut
                          semper ligula."
                          />
                        </small>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      style={{
                        width: "290px",
                        height: "240px",
                        margin: "50px 19px 19px 19px",
                        borderRadius: "8px",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={client1}
                        alt=""
                        style={{
                          borderRadius: "50px",
                          width: "90px",
                          height: "90px",
                          marginTop: "-50px",
                        }}
                      />
                      <div>
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Estar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                      </div>
                      <div
                        style={{
                          textAlign: "justify",
                          padding: "30px",
                          overflow: "hidden",
                          height: "152px",
                        }}
                      >
                        <small>
                          <FormattedMessage
                            id="Our_clients_feedbacks_desc2"
                            defaultMessage="Integer ac interdum lacus. Nunc porta semper lacus a
                          varius. Pellentesque habitant morbi tristique senectus
                          et netus et malesuada fames ac turpis egestas. Nunc
                          sagittis consectetur velit, ac gravida nunc gravida
                          et. Vestibulum at eros imperdiet, volutpat nunc vitae,
                          ornare erat. Proin interdum aliquet porta. Fusce ut
                          semper ligula."
                          />
                        </small>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      style={{
                        width: "290px",
                        height: "240px",
                        margin: "50px 19px 19px 19px",
                        borderRadius: "8px",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={client1}
                        alt=""
                        style={{
                          borderRadius: "50px",
                          width: "90px",
                          height: "90px",
                          marginTop: "-50px",
                        }}
                      />
                      <div>
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                        <img
                          src={Fstar}
                          alt=""
                          style={{ width: "40px", padding: "0 5px" }}
                        />
                      </div>
                      <div
                        style={{
                          textAlign: "justify",
                          padding: "30px",
                          overflow: "hidden",
                          height: "152px",
                        }}
                      >
                        <small>
                          <FormattedMessage
                            id="Our_clients_feedbacks_desc3"
                            defaultMessage="Integer ac interdum lacus. Nunc porta semper lacus a
                          varius. Pellentesque habitant morbi tristique senectus
                          et netus et malesuada fames ac turpis egestas. Nunc
                          sagittis consectetur velit, ac gravida nunc gravida
                          et. Vestibulum at eros imperdiet, volutpat nunc vitae,
                          ornare erat. Proin interdum aliquet porta. Fusce ut
                          semper ligula."
                          />
                        </small>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="justify-content-center text-center">
              <h2
                className="text-9"
                style={{ fontWeight: "bold", color: "#2D335B" }}
              >
                <FormattedMessage
                  id="Download_The_APP"
                  defaultMessage="Download The APP"
                />
              </h2>
              <p
                className="lead mt-4"
                style={{
                  fontWeight: "bold",
                  color: "#2D335B",
                  textTransform: "capitalize",
                }}
              >
                <FormattedMessage
                  id="Download_app"
                  defaultMessage="Download our app for the fastest, most convenient way to send & get Payment."
                />
              </p>
              <a
                className="d-inline-flex mx-3"
                href="https://apps.apple.com/in/app/fastpay-wallet/id1255784969"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" width="250" height="150" src={appStore} />
              </a>
              <a
                className="d-inline-flex mx-3"
                href="https://play.google.com/store/apps/details?id=com.sslwireless.fastpay"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" width="250" height="150" src={googlePlayStore} />
              </a>
            </div>
          </div>
        </section>

        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={Logo} width={100} alt="" /> <br />
                <div style={{ margin: "10px 0 0 0" }}>
                  <small style={{ fontSize: "16px", color: "#fff" }}>
                    <FormattedMessage
                      id="Support_link"
                      defaultMessage="Support.fast-pay.cash"
                    />
                  </small>
                </div>{" "}
                <br />
                <small style={{ fontSize: "16px", color: "#fff" }}>
                  <FormattedMessage
                    id="Support_Mob"
                    defaultMessage="+964 66 231 0000"
                  />
                </small>
              </div>
              <div className="col-md-3">
                <small
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#FC2861",
                  }}
                >
                  <FormattedMessage
                    id="QUICK_LINKS"
                    defaultMessage="QUICK LINKS"
                  />
                </small>{" "}
                <br />
                <div style={{ margin: "10px 0 0 0" }}>
                  <small style={{ fontSize: "16px", color: "#fff" }}>
                    <FormattedMessage
                      id="How_it_works"
                      defaultMessage="How it works"
                    />
                  </small>
                </div>{" "}
                <br />
                <div style={{ margin: "10px 0 0 0" }}>
                  <a href="https://merchant.fast-pay.cash/counter-panel/login" target="_blank" style={{ fontSize: "16px", color: "#fff" }}>
                    <FormattedMessage
                      id="Counter_panel"
                      defaultMessage="Counter Panel"
                    />
                  </a>
                </div>{" "}
                <br />
                <small style={{ fontSize: "16px", color: "#fff" }}>
                  <FormattedMessage
                    id="support_page_contact_us"
                    defaultMessage="Contact Us"
                  />
                </small>
              </div>
              <div className="col-md-3">
                {" "}
                <small
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#FC2861",
                  }}
                >
                  <FormattedMessage id="About_Us" defaultMessage="About Us" />
                </small>{" "}
                <br />
                <div style={{ margin: "10px 0 0 0" }}>
                  <small style={{ fontSize: "16px", color: "#fff" }}>
                    <FormattedMessage
                      id="About_Fastpay"
                      defaultMessage="About Fastpay"
                    />
                  </small>
                </div>{" "}
                <br />
                <small style={{ fontSize: "16px", color: "#fff" }}>
                  <FormattedMessage id="Blog" defaultMessage="Blog" />
                </small>
              </div>
            </div>
            <div className="footer-copyright pt-3 pt-lg-2 mt-2">
              <div className="row">
                <div className="col-lg">
                  <p className="text-center text-lg-left mb-2 mb-lg-0">
                    © <FormattedMessage id="FastPay" defaultMessage="FastPay" />{" "}
                    &copy; 2020.{" "}
                    <FormattedMessage
                      id="All_rights_reserved"
                      defaultMessage="All Rights Reserved"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* )} */}
      <MobileView />
    </React.Fragment>
  );
}
