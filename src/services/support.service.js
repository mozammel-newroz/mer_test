import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const APIsupport_URL = "api/v1/private/";

class SupportService {
  support() {
    try {
      return axios.get(
        Base_URL +
          APIsupport_URL +
          `support-content?lang=${localStorage.getItem("MnewLocale")}`,
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

export default new SupportService();
