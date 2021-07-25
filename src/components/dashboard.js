import React, { useEffect } from "react";
//import AuthService from "../services/auth.service";
import Transaction from "./Transactions";
import Navbar from "../components/Navbar";
import Vnavbar from "../components/Vnavbar";
import SideBar from "../components/sidebar";
// import Chart from "./ChartTran";
import Footer from "./Footer";
import MobileView from "./MobileView";
//import $ from "jquery";
// import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function Dashboard() {
  // let history = useHistory();

  //const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    //  const user = AuthService.getCurrentUser();
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
                  {/* <div
                    className="bg-white shadow-md p-4 mb-4"
                    style={{ borderRadius: "8px" }}
                  >
                    <h6
                      className="font-weight-600 mb-3"
                      style={{ color: "#2D335B" }}
                    >
                      <FormattedMessage
                        id="Transaction-Summary"
                        defaultMessage="Transaction Summary"
                      />
                    </h6>
                    <Chart />
                  </div> */}
                  <h4
                    className="font-weight-600 mb-3"
                    style={{ color: "#2D335B" }}
                  >
                    <FormattedMessage
                      id="home_page_latest_transactions"
                      defaultMessage="Latest Transaction"
                    />
                  </h4>
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
