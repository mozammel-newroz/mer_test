import axios from "axios";
import authHeader from "./auth-header";
import Cookies from "js-cookie";
import hostAPI from "./GetHost";

let Base_URL = `${hostAPI.getHost()}`;

const APIchangePass_URL = "api/v1/auth/change-password/";
const APIchangePin_URL = "api/v1/auth/pin-change/";
const APIforgotPass_URL = "api/v1/auth/forgot-password/";

class SecurityService {
  changePassword(old_password, password, password_confirmation) {
    try {
      return axios.post(
        Base_URL +
          APIchangePass_URL +
          `step-1?lang=${localStorage.getItem("MnewLocale")}`,
        {
          old_password,
          password,
          password_confirmation,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  confirmPassword(old_password, password, password_confirmation, otp) {
    try {
      return axios.post(
        Base_URL +
          APIchangePass_URL +
          `step-2?lang=${localStorage.getItem("MnewLocale")}`,
        {
          old_password,
          password,
          password_confirmation,
          otp,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  changePin(old_pin, pin, pin_confirmation) {
    try {
      return axios.post(
        Base_URL +
          APIchangePin_URL +
          `step-1?lang=${localStorage.getItem("MnewLocale")}`,
        {
          old_pin,
          pin,
          pin_confirmation,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  confirmPin(old_pin, pin, pin_confirmation, otp) {
    try {
      return axios.post(
        Base_URL +
          APIchangePin_URL +
          `step-2?lang=${localStorage.getItem("MnewLocale")}`,
        {
          old_pin,
          pin,
          pin_confirmation,
          otp,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  forgotPass(email) {
    try {
      return axios.post(
        Base_URL +
          APIforgotPass_URL +
          `send-otp?lang=${localStorage.getItem("MnewLocale")}`,
        {
          email,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  forgotConfirmPass(email, otp) {
    try {
      return axios.post(
        Base_URL +
          APIforgotPass_URL +
          `verify-otp?lang=${localStorage.getItem("MnewLocale")}`,
        {
          email,
          otp,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  resetPass(email, otp, password, password_confirmation) {
    try {
      return axios.post(
        Base_URL +
          APIforgotPass_URL +
          `reset?lang=${localStorage.getItem("MnewLocale")}`,
        {
          email,
          otp,
          password,
          password_confirmation,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }
}

export default new SecurityService();
