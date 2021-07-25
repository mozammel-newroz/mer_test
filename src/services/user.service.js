import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const API_URL = "api/v1/private/user/";

class UserService {
  getUserBoard() {
    try {
      return axios.get(
        Base_URL +
          API_URL +
          `profile?lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  putUserBoard(
    full_name,
    surname,
    date_of_birth,
    country_id,
    state_id,
    address_line1
  ) {
    try {
      return axios.put(
        Base_URL +
          API_URL +
          `profile-update?lang=${localStorage.getItem("MnewLocale")}`,
        {
          full_name,
          surname,
          date_of_birth,
          country_id,
          state_id,
          address_line1,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  getUserBasicInfo() {
    try {
      return axios.get(
        Base_URL +
          API_URL +
          `basic-information?lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  getNotifications(page) {
    try {
      return axios.get(
        Base_URL +
          API_URL +
          `notifications?page=${page}&lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  readNotification(id) {
    try {
      return axios.post(
        Base_URL +
          API_URL +
          `notification?lang=${localStorage.getItem("MnewLocale")}`,
        { id },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }
}

export default new UserService();
