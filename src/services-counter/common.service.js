import axios from "axios";
import Auth from "./auth.service";
import Cookies from "js-cookie";

class Common {
  getTransactionList = async () => {
    try {
      const accessToken = Cookies.getJSON("counter_acc");
      const res = await axios.get(
        `${Auth.getHost()}counter-panel-api/v1/transactions`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return res.data;
    } catch (error) {
      Cookies.remove("counter_acc");
      Cookies.remove("user");
      localStorage.clear();
      window.location.reload();
    }
  };

  getBasicInfoList = async () => {
    try {
      const accessToken = Cookies.getJSON("counter_acc");
      const res = await axios.get(
        `${Auth.getHost()}counter-panel-api/v1/merchant/basic-information`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return res.data;
    } catch (error) {
      Cookies.remove("counter_acc");
      Cookies.remove("user");
      localStorage.clear();
      window.location.reload();
    }
  };

  changeUserPassword = async (userPassInfo) => {
    try {
      const accessToken = Cookies.getJSON("counter_acc");
      const loginResponse = await axios.post(
        `${Auth.getHost()}counter-panel-api/v1/change-password`,
        userPassInfo,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return loginResponse.data;
    } catch (error) {
      Cookies.remove("counter_acc");
      Cookies.remove("user");
      localStorage.clear();
      window.location.reload();
    }
  };

  userSignOut = async () => {
    const accessToken = Cookies.getJSON("counter_acc");
    const loginResponse = await axios.post(
      `${Auth.getHost()}counter-panel-api/v1/auth/logout`,
      {},

      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return loginResponse.data;
  };
}

export default new Common();
