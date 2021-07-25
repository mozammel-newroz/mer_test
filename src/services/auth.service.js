import axios from "axios";
import Cookies from "js-cookie";
import hostAPI from "./GetHost";

let Base_URL = `${hostAPI.getHost()}`;

const API_URL = "api/v1/auth/";
// const Base_URL = "https://staging-apigw-merchant.fast-pay.cash/";
const Reg_Existence_URL = "api/v1/auth/signup/";
const Reg_Verify_URL = "api/v1/auth/signup/verify/";


class AuthService {
  // Login
  async login(mobile_number, password) {
    mobile_number = mobile_number.split(" ").join("");

    return await axios.post(Base_URL + API_URL + `signin?lang=${localStorage.getItem("MnewLocale")}`, {
      mobile_number,
      password,
    });
  }

  // LogOut
  logout() {
    Cookies.remove("Mtoken");
    localStorage.clear();
  }

  // Register
  regExistence(mobile_number) {
    mobile_number = mobile_number.split(" ").join("");

    return axios.post(Base_URL + Reg_Existence_URL + `existence?lang=${localStorage.getItem("MnewLocale")}`, {
      mobile_number,
    });
  }

  regCredentials(
    mobile_number,
    first_name,
    last_name,
    email,
    password,
    password_confirmation
  ) {
    mobile_number = mobile_number.split(" ").join("");

    return axios.post(Base_URL + Reg_Existence_URL + `credentials?lang=${localStorage.getItem("MnewLocale")}`, {
      mobile_number,
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
    });
  }

  regVerify(
    mobile_number,
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    email_otp
  ) {
    mobile_number = mobile_number.split(" ").join("");

    return axios.post(Base_URL + Reg_Verify_URL + `email?lang=${localStorage.getItem("MnewLocale")}`, {
      mobile_number,
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      email_otp,
    });
  }

  firebaseAuthInfo(mobile_number, uid) {
    mobile_number = mobile_number.split(" ").join("");

    return axios.post(Base_URL + Reg_Existence_URL + `firebase-auth-info?lang=${localStorage.getItem("MnewLocale")}`, {
      mobile_number,
      uid,
    });
  }

  regCompletion(
    mobile_number,
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    email_otp,
    accept,
    uid
  ) {
    mobile_number = mobile_number.split(" ").join("");

    return axios.post(Base_URL + Reg_Existence_URL + `completion?lang=${localStorage.getItem("MnewLocale")}`, {
      mobile_number,
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      email_otp,
      accept,
      uid,
    });
  }

  // Get Current User
  getCurrentUser() {
    return Cookies.getJSON("Mtoken");
  }
}

export default new AuthService();
