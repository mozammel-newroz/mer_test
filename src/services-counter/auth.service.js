import axios from "axios";
import Cookies from "js-cookie";

class Auth {
  getHost = () => {
    let REACT_APP_BASE_URL2 = process.env.REACT_APP_BASE_URL2;

    if (
      typeof REACT_APP_BASE_URL2 === "undefined" ||
      REACT_APP_BASE_URL2 === "" ||
      REACT_APP_BASE_URL2 === null
    ) {
      REACT_APP_BASE_URL2 = "https://sudo.fast-pay.cash/";
    }

  //  REACT_APP_BASE_URL2 = "https://dev-sudo.fast-pay.cash/";

    return REACT_APP_BASE_URL2;
  };

  login = async (user) => {
    const loginResponse = await axios.post(
      `${this.getHost()}counter-panel-api/v1/auth/login/otp-generate`,
      {
        email: user.email,
        password: user.password,
      }
    );
    return loginResponse.data;
  };
  loginWithOtp = async (user) => {
    const res = await axios.post(
      `${this.getHost()}counter-panel-api/v1/auth/login/otp-verify`,
      {
        email: user.email,
        password: user.password,
        otp: user.userOtp,
      }
    );
    if (res.data.code === 200) {
      if (res.data.data) {
        Cookies.set(
          "counter_acc",
          res.data.data.token,
          { path: "/" },
          { expires: 3 }
        ); //Expire After 3 days
        //  console.log("3 day " + this.state.remember)
        Cookies.set(
          "user",
          res && res.data && res.data.data && res.data.data.user
        );
      }
      return res.data;
    } else {
      return res.data;
    }
  };

  getForgetPasswordOTP = async (logInfo) => {
    const res = await axios.post(
      `${this.getHost()}counter-panel-api/v1/auth/forgot-password/otp-generate`,
      logInfo
    );
    return res.data;
  };

  forgetPassword = async (logInfo) => {
    const res = await axios.post(
      `${this.getHost()}counter-panel-api/v1/auth/forgot-password/otp-verify`,
      logInfo
    );
    return res.data;
  };

  logout = () => {
    Cookies.remove("counter_acc");
    Cookies.remove("user");
    localStorage.clear();
  };
}

export default new Auth();
