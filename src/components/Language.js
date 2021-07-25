import React, { useEffect, useContext } from "react";
import { Context } from "./Wrapper";
import BrImg from "../assets/images/britain-48.png";
import IraqImg from "../assets/images/iraq-48.png";
import KrImg from "../assets/images/kurdistan-48.png";


export default function Language() {
  useEffect(() => {}, []);

  const context = useContext(Context);

  return (
    <React.Fragment>
      <div
        className="header-column justify-content-end"
      //  style={{ paddingRight: "15px" }}
      >
        <nav className="login-signup navbar navbar-expand">
          <ul className="navbar-nav">
          
            <li className="dropdown language">
              <select
                value={context.locale ? context.locale : "en"}
                onChange={context.selectLanguage}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#b1b0b0",
                  textTransform: "uppercase",
                  fontWeight: "500",
                  height: "80px",
                  paddingLeft: "0.85em",
                  paddingRight: "0.85em",
                  transition: "all 0.2s ease",
                  position: "relative",

                  display: "flex",
                  alignItems: "center",
                }}
              >
                <option className="dropdown language" value="en">
                {/* <img src={IraqImg} /> */}
                  En
                </option>
                <option value="ar">Ar</option>
                <option value="kr">Kr</option>
              </select>

            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}
