import React from "react";
import Logo from "../assets/images/logo.png";
import appStore from "../assets/images/appstore.svg";
import googlePlayStore from "../assets/images/google.svg";
import { FormattedMessage } from "react-intl";

export default function MobileView() {
  return (
    <React.Fragment>
      <div className="MobileView">
        <div id="content">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-9 col-lg-7 col-xl-5 mx-auto">
                <div className="text-center">
                  <a
                    href="https://www.fast-pay.cash/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Logo} alt="" width={250} />
                  </a>
                </div>
                <br />
                <section className="section py-5">
                  <div className="container">
                    <div className="justify-content-center text-center">
                      <h2 className="text-9">
                        <FormattedMessage
                          id="Get_the_app"
                          defaultMessage="Get the app"
                        />
                      </h2>
                      <p className="lead mb-4">
                        <FormattedMessage
                          id="Download_app"
                          defaultMessage="Download our app for the fastest, most convenient way to
                        send & get Payment."
                        />
                      </p>
                      <a
                        className="d-inline-flex mx-3"
                        href="https://apps.apple.com/in/app/fastpay-wallet/id1255784969"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img alt="" width="168" height="49" src={appStore} />
                      </a>
                      <a
                        className="d-inline-flex mx-3"
                        href="https://play.google.com/store/apps/details?id=com.sslwireless.fastpay"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt=""
                          width="166"
                          height="49"
                          src={googlePlayStore}
                        />
                      </a>{" "}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
