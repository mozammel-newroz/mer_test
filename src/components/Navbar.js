import React, { useEffect, useState, useContext } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Logo from "../assets/images/logo2.svg";
import NoPhoto from "../assets/images/no-photo.png";
import $ from "jquery";
// import { Context } from "./Wrapper";
import { FormattedMessage } from "react-intl";
import Language from "./Language";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  let history = useHistory();

  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [unRead, setUnRead] = useState(0);
  const [email, setEmail] = useState("");
  const [basicInfo, setBasicInfo] = useState("");

  useEffect(() => {
    // Dropdown show on hover
    $(
      ".primary-menu ul.navbar-nav li.dropdown, .login-signup ul.navbar-nav li.dropdown"
    ).on("mouseover", function () {
      if ($(window).width() > 991) {
        $(this).find("> .dropdown-menu").stop().slideDown("fast");
        $(this).bind("mouseleave", function () {
          $(this).find("> .dropdown-menu").stop().css("display", "none");
        });
      }
    });

    // When dropdown going off to the out of the screen.
    // $(".primary-menu .dropdown-menu, .login-signup .dropdown-menu").each(
    //   function () {
    //     var menu = $("#header .header-row").offset();
    //     var dropdown = $(this).parent().offset();

    //     // var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#header .header-row').outerWidth());

    //     // if (i > 0) {
    //     // 	$(this).css('margin-left', '-' + (i) + 'px');
    //     // }
    //   }
    // );

    // $(function () {
    //   $(".dropdown li").on("mouseenter mouseleave", function (e) {
    //     if ($(window).width() > 991) {
    //       var elm = $(".dropdown-menu", this);
    //       var off = elm.offset();
    //       //    var l = off.left;
    //       var w = elm.width();
    //       var docW = $(window).width();

    //       //     var isEntirelyVisible = (l + w + 30 <= docW);
    //       //     if (!isEntirelyVisible) {
    //       //         $(elm).addClass('dropdown-menu-right');
    //       // $(elm).parents('.dropdown:first').find('> a.dropdown-toggle > .arrow').addClass('arrow-right');
    //       //     } else {
    //       //         $(elm).removeClass('dropdown-menu-right');
    //       // $(elm).parents('.dropdown:first').find('> a.dropdown-toggle > .arrow').removeClass('arrow-right');
    //       //     }
    //     }
    //   });
    // });

    // DropDown Arrow
    $(".primary-menu, .login-signup")
      .find("a.dropdown-toggle")
      .append($("<i />").addClass("arrow"));

    // Mobile Collapse Nav
    $(
      '.primary-menu .dropdown-toggle[href="#"], .primary-menu .dropdown-toggle[href!="#"] .arrow, .login-signup .dropdown-toggle[href="#"], .login-signup .dropdown-toggle[href!="#"] .arrow'
    ).on("click", function (e) {
      if ($(window).width() < 991) {
        e.preventDefault();
        var $parentli = $(this).closest("li");
        $parentli.siblings("li").find(".dropdown-menu:visible").slideUp();
        $parentli.find("> .dropdown-menu").stop().slideToggle();
        $parentli.siblings("li").find("a .arrow.open").toggleClass("open");
        $parentli.find("> a .arrow").toggleClass("open");
      }
    });

    // Mobile Menu Button Icon
    $(".navbar-toggler").on("click", function () {
      $(this).toggleClass("open");
    });

    UserService.getUserBoard().then(
      (response) => {
        if (response.data.code === 200) {
          setEmail(response.data.data.profile);
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

    UserService.getUserBasicInfo().then(
      (response) => {
        if (response.data.code === 200) {
          setBasicInfo(response.data.data.user);

          localStorage.setItem(
            "MfirstName",
            response.data.data.user.first_name
          );
          localStorage.setItem("MlasttName", response.data.data.user.last_name);
          localStorage.setItem(
            "MprofileImg",
            response.data.data.user.profile_thumbnail
          );
          localStorage.setItem(
            "MmobileNo",
            response.data.data.user.mobile_number
          );

          // localStorage.setItem("MfirstName", response.data.data.user.first_name);
          // localStorage.setItem("MlasttName", response.data.data.user.last_name);
          // localStorage.setItem(
          //   "MprofileImg",
          //   response.data.data.user.profile_thumbnail
          // );
          // localStorage.setItem("MmobileNo", response.data.data.user.mobile_number);
          // localStorage.setItem("qrCode", response.data.data.user.qr_code_text);
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

    UserService.getNotifications().then(
      (response) => {
        if (response.data.code === 200) {
          var unRead = response.data.data.unread_count;
          // {
          //   response.data.data.notifications.map((notification, i) => {
          //     if (notification.read_at === null) {
          //       unRead++;
          //     }
          //   });
          // }
          setNotifications(response.data.data.notifications);
          setUnRead(unRead++);
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

  const logOut = () => {
    AuthService.logout();
  };

  const handleRead = (e, id) => {
    e.preventDefault();

    setMessage("");

    var color = document.getElementById("read" + id).style.color;

    if (color == "gray") return false;

    document.getElementById("read" + id).style.color = "gray";

    UserService.readNotification(id).then(
      (response) => {
        if (response.data.code !== 200) {
          setMessage(response.data.messages);
        } else {
          setMessage(response.data.messages);
        }

        var count = document.getElementsByClassName("count")[0];

        if (count.innerHTML > 0) {
          count.innerHTML = count.innerHTML - 1;
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.messages) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  // const context = useContext(Context);

  //console.log(context.locale + "  locale");

  return (
    <React.Fragment>
      <div>
        <header id="header">
          <div
            className="container-fluid"
            style={{ paddingLeft: "104px", paddingRight: "104px" }}
          >
            <div className="header-row">
              <div className="header-column justify-content-start">
                <div className="logo">
                  {" "}
                  <a className="d-flex" href="/dashboard" title="">
                    <img src={Logo} alt="" width={130} />
                  </a>{" "}
                </div>
              </div>
              <div className="header-column justify-content-end">
                <nav className="login-signup navbar navbar-expand">
                  <ul className="navbar-nav">
                    <Language />

                    <li
                      className="dropdown notifications"
                      style={{ justifyContent: "center" }}
                    >
                      {" "}
                      <a className="dropdown-toggle" href="#">
                        <span className="text-5" style={{ color: "#ffff" }}>
                          <i className="far fa-bell"></i>
                        </span>
                        {unRead === 0 ? null : (
                          <span className="count">{unRead}</span>
                        )}
                      </a>
                      <ul
                        className="dropdown-menu"
                        style={{
                          height: "317px",
                          overflowX: "hidden",
                          overflowY: "scroll",
                          left: "auto",
                          //  left: "inherit",
                          //  right: 0,
                        }}
                      >
                        <li className="text-center text-3 py-2">
                          <FormattedMessage
                            id="app.Notifications"
                            defaultMessage="Notifications"
                          />
                        </li>
                        <li className="dropdown-divider mx-n3"></li>

                        {notifications ? (
                          <div>
                            {notifications.map((notification, i) => {
                              return (
                                <li key={i}>
                                  {notification.read_at ? (
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      style={{ color: "gray" }}
                                    >
                                      <i className="far fa-bell"></i>
                                      {notification.description}
                                      <span className="text-1 text-muted d-block">
                                        {notification.created_at}
                                      </span>
                                    </a>
                                  ) : (
                                    <a
                                      className="dropdown-item"
                                      style={{ color: "#fc2861" }}
                                      id={"read" + notification.id}
                                      href="#"
                                      onClick={(e) =>
                                        handleRead(e, notification.id)
                                      }
                                    >
                                      <i className="fas fa-bell"></i>
                                      {notification.description}
                                      <span className="text-1 text-muted d-block">
                                        {notification.created_at}
                                      </span>
                                    </a>
                                  )}
                                </li>
                              );
                            })}
                          </div>
                        ) : null}

                        <li className="dropdown-divider mx-n3"></li>
                        <li>
                          <a
                            className="dropdown-item text-center text-primary px-0"
                            href="/notifications"
                          >
                            <FormattedMessage
                              id="all_Notifications"
                              defaultMessage="See all Notifications"
                            />
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li
                      className="dropdown profile ml-2"
                      style={{ justifyContent: "center" }}
                    >
                      {" "}
                      {basicInfo.profile_thumbnail ? (
                        <a className="px-0 dropdown-toggle" href="#">
                          <img
                            className="rounded-circle"
                            style={{
                              border: "2px solid #ffff",
                              width: "45px",
                              height: "45px",
                            }}
                            src={basicInfo.profile_thumbnail}
                            alt=""
                          />
                        </a>
                      ) : (
                        <a className="px-0 dropdown-toggle" href="#">
                          <img
                            className="rounded-circle"
                            style={{
                              border: "2px solid #ffff",
                              width: "45px",
                              height: "45px",
                            }}
                            src={NoPhoto}
                            alt=""
                          />
                        </a>
                      )}
                      <ul
                        className="dropdown-menu"
                        style={{
                          left: "auto",
                          //  left: "inherit", right: 0
                        }}
                      >
                        <li
                          className="text-3 py-2"
                          style={{ textTransform: "capitalize" }}
                        >
                          <div style={{ display: "inline-flex" }}>
                            {basicInfo.profile_thumbnail ? (
                              <img
                                className="rounded-circle"
                                style={{
                                  border: "2px solid #ffff",
                                  width: "45px",
                                  height: "45px",
                                }}
                                src={basicInfo.profile_thumbnail}
                                alt=""
                              />
                            ) : (
                              <img
                                className="rounded-circle"
                                style={{
                                  border: "2px solid #ffff",
                                  width: "45px",
                                  height: "45px",
                                }}
                                src={NoPhoto}
                                alt=""
                              />
                            )}
                            <div style={{ paddingLeft: "3px" }}>
                              {basicInfo.first_name} {basicInfo.last_name}{" "}
                              <br />
                              <small>{email && email.email}</small>
                            </div>
                          </div>
                        </li>
                        <li className="dropdown-divider mx-n3"></li>
                        <li>
                          <a className="dropdown-item" href="/changepassword">
                            <i className="fas fa-lock"></i>
                            <FormattedMessage
                              id="my_account_page_change_password_title"
                              defaultMessage="Change Password"
                            />
                          </a>
                        </li>
                        <li className="dropdown-divider mx-n3"></li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="/login"
                            onClick={logOut}
                          >
                            <i className="fas fa-sign-out-alt"></i>
                            <FormattedMessage
                              id="Sign_Out"
                              defaultMessage="Sign Out"
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
  //  }
}
