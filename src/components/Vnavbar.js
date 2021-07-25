import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/images/Icon-home.png";
import withdraeico from "../assets/images/withdraeico.svg";
import refund from "../assets/images/refund.svg";
import reqPay from "../assets/images/reqPay.svg";
import IconStore from "../assets/images/Icon-store.svg";
import transaction from "../assets/images/transaction.svg";
import Notifications from "../assets/images/bell.png";
import { FormattedMessage } from "react-intl";

export default class Vnavbar extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          {/* For Desktop */}
          <div className="asideDesktopView asideDesktopView">
            <header>
              <div className="header-row">
                <div className="header-column justify-content-start">
                  <nav className="primary-menu navbar navbar-expand-lg pt-0">
                    <div id="header-nav">
                      <ul className="vertical-ul">
                        <li className="vertical-li">
                          <NavLink
                            to="/dashboard"
                            data-tooltip="Home"
                            data-tooltip-location="right"
                          >
                            <img
                              src={HomeIcon}
                              alt=""
                              className="SidebarIcon"
                            />
                          </NavLink>
                        </li>

                        <li className="vertical-li">
                          <NavLink
                            to="/withdraw"
                            data-tooltip="withdraw"
                            data-tooltip-location="right"
                          >
                            <img
                              src={withdraeico}
                              alt=""
                              style={{
                                width: "30px",
                                height: "30px",
                                marginLeft: "4px",
                                marginTop: "1px",
                              }}
                            />
                          </NavLink>
                        </li>
                        {/* <li className="vertical-li">
                          <NavLink to="/deposit">
                            <img src={withdraeico} alt="" />
                          </NavLink>
                        </li> */}

                        <li className="vertical-li">
                          <NavLink
                            to="/refund"
                            data-tooltip="Refund"
                            data-tooltip-location="right"
                          >
                            <img src={refund} alt="" className="SidebarIcon" />
                          </NavLink>
                        </li>

                        <li className="vertical-li">
                          <NavLink
                            to="/requestpayment"
                            data-tooltip="Request Payment"
                            data-tooltip-location="right"
                          >
                            <img src={reqPay} alt="" className="SidebarIcon" />
                          </NavLink>
                        </li>
                        <li className="vertical-li">
                          <NavLink
                            to="/store"
                            data-tooltip="Store"
                            data-tooltip-location="right"
                          >
                            <img
                              src={IconStore}
                              alt=""
                              className="SidebarIcon"
                            />
                          </NavLink>
                        </li>
                        <li className="vertical-li">
                          <NavLink
                            to="/transactions"
                            data-tooltip="Transactions"
                            data-tooltip-location="right"
                          >
                            <img
                              src={transaction}
                              alt=""
                              className="SidebarIcon"
                            />
                          </NavLink>
                        </li>
                        <li className="vertical-li">
                          <NavLink
                            to="/notifications"
                            data-tooltip="Notifications"
                            data-tooltip-location="right"
                          >
                            <img
                              src={Notifications}
                              alt=""
                              className="SidebarIcon"
                            />
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </header>
          </div>

          <div className="asideTabView">
            <div style={{ height: "65px" }}>
              <ul
                className="vertical-ul"
                style={{ display: "flex", width: "96%" }}
              >
                <li
                  className="vertical-li"
                  style={{ paddingLeft: "35px", width: "90px" }}
                >
                  <NavLink
                    to="/dashboard"
                    data-tooltip="Home"
                    data-tooltip-location="right"
                  >
                    <img src={HomeIcon} alt="" className="SidebarIcon" />
                  </NavLink>
                </li>

                <li
                  className="vertical-li"
                  style={{ paddingLeft: "35px", width: "90px" }}
                >
                  <NavLink
                    to="/withdraw"
                    data-tooltip="withdraw"
                    data-tooltip-location="right"
                  >
                    <img
                      src={withdraeico}
                      alt=""
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "4px",
                        marginTop: "1px",
                      }}
                    />
                  </NavLink>
                </li>
                {/* <li className="vertical-li">
                          <NavLink to="/deposit">
                            <img src={withdraeico} alt="" />
                          </NavLink>
                        </li> */}

                <li
                  className="vertical-li"
                  style={{ paddingLeft: "35px", width: "90px" }}
                >
                  <NavLink
                    to="/refund"
                    data-tooltip="Refund"
                    data-tooltip-location="right"
                  >
                    <img src={refund} alt="" className="SidebarIcon" />
                  </NavLink>
                </li>

                <li
                  className="vertical-li"
                  style={{ paddingLeft: "35px", width: "90px" }}
                >
                  <NavLink
                    to="/requestpayment"
                    data-tooltip="Request Payment"
                    data-tooltip-location="right"
                  >
                    <img src={reqPay} alt="" className="SidebarIcon" />
                  </NavLink>
                </li>
                <li
                  className="vertical-li"
                  style={{ paddingLeft: "35px", width: "90px" }}
                >
                  <NavLink
                    to="/store"
                    data-tooltip="Store"
                    data-tooltip-location="right"
                  >
                    <img src={IconStore} alt="" className="SidebarIcon" />
                  </NavLink>
                </li>
                <li
                  className="vertical-li"
                  style={{ paddingLeft: "35px", width: "90px" }}
                >
                  <NavLink
                    to="/transactions"
                    data-tooltip="Transactions"
                    data-tooltip-location="right"
                  >
                    <img src={transaction} alt="" className="SidebarIcon" />
                  </NavLink>
                </li>
                <li
                  className="vertical-li"
                  style={{ paddingLeft: "35px", width: "90px" }}
                >
                  <NavLink
                    to="/notifications"
                    data-tooltip="Notifications"
                    data-tooltip-location="right"
                  >
                    <img src={Notifications} alt="" className="SidebarIcon" />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
