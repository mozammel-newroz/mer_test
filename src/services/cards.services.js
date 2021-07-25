import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const APIonline_URL = "api/v1/private/transaction/bundle-purchase/";
const APIinternet_URL = "api/v1/private/transaction/bundle-purchase/";
const APImobile_URL = "api/v1/private/transaction/bundle-purchase/";

class CardsService {
  getOnlineCards() {
    try {
      return axios.get(
        Base_URL +
          APIonline_URL +
          `operators?type=OC?lang=${localStorage.getItem("MnewLocale")}`,
        {
          headers: authHeader(),
        }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  getInternetCards() {
    try {
      return axios.get(
        Base_URL +
          APIinternet_URL +
          `operators?type=IR?lang=${localStorage.getItem("MnewLocale")}`,
        {
          headers: authHeader(),
        }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  getMobileCards() {
    try {
      return axios.get(
        Base_URL +
          APImobile_URL +
          `operators?type=MR?lang=${localStorage.getItem("MnewLocale")}`,
        {
          headers: authHeader(),
        }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }
}

export default new CardsService();
