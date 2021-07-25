import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const APIpromotion_URL = "api/v1/private/promotional-offers/";

class PromotionService {
  promotions() {
    try {
      return axios.get(
        Base_URL +
          APIpromotion_URL +
          `show-all?lang=${localStorage.getItem("MnewLocale")}`,
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

  topPromotions() {
    try {
      return axios.get(
        Base_URL +
          APIpromotion_URL +
          `top-5?lang=${localStorage.getItem("MnewLocale")}`,
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

export default new PromotionService();
