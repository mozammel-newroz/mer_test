import React, { useEffect } from "react";
//import AuthService from "../services/auth.service";
import Transaction from "./Transactions";
import Navbar from "../components/Navbar";
import Vnavbar from "../components/Vnavbar";
import SideBar from "../components/sidebar";
import MobileView from "./MobileView";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import { FormattedMessage } from "react-intl";

export default function TransactionPage(props) {
  let history = useHistory();

  useEffect(() => {
    // const user = AuthService.getCurrentUser();
    // if (!user) {
    //   history.push("/login");
    //   window.location.reload();
    // }
  }, []);

  return (
    <React.Fragment>
      <div>
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
                  <h5 className="font-weight-500 mb-3">
                    <FormattedMessage
                      id="statements_page_transaction_history"
                      defaultMessage="Transaction History"
                    />{" "}
                  </h5>
                  <Transaction />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <MobileView />
      </div>
    </React.Fragment>
  );
}
