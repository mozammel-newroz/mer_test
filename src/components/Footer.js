import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

export default function Footer() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    setDateTime(new Date().getFullYear());
  }, []);

  return (
    <React.Fragment>
      <footer id="footer2">
        <div className="container-fluid">
          <div className="footer-copyright2 container-fluid">
            <div className="row container-fluid">
              <div className="col-lg col-s-6">
                <p className="text-center text-lg-left mb-2 mb-lg-0">
                  &copy; FastPay {dateTime}.{" "}
                  <FormattedMessage
                    id="All_rights_reserved"
                    defaultMessage="All rights reserved"
                  />
                </p>
              </div>
              <div style={{ paddingRight: "50px" }}>
                <p className="text-center text-lg-right mb-2 mb-lg-0">
                  <FormattedMessage
                    id="Privacy_Policy"
                    defaultMessage="Privacy Policy"
                  />
                </p>
              </div>
              <div>
                <p className="text-center text-lg-right mb-2 mb-lg-0">
                  <FormattedMessage
                    id="Terms_Conditions"
                    defaultMessage="Terms and Conditions"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
