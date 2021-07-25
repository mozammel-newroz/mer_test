import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const API_URL = "api/v1/private/kyc/";

class KycService {
  getKyc() {
    try {
      return axios.get(
        Base_URL +
          API_URL +
          `verification-documents?lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }
}

export default new KycService();
