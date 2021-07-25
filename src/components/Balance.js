import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import { useHistory } from "react-router-dom";

export default function Balance() {
  let history = useHistory();

  const [balance, setBalance] = useState([]);
  const [NoData, setNoData] = React.useState(false);

  useEffect(() => {
    UserService.getUserBasicInfo().then(
      (response) => {
        if (response.data.code === 200) {
          if (response.data.data.user.available_balance.length > 0) {
            setBalance(response.data.data.user.available_balance[0]);
          } else {
            document.getElementById("noBalance").style.display = "none";
            setNoData(true);
          }
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
      <div id="noBalance" className="balanceStyle">
        {balance.currency} {balance.balance}
      </div>

      {NoData && <div>0</div>}
    </React.Fragment>
  );
}
