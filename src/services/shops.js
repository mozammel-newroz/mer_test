import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const API_URL = "api/v1/private/user/store/";

const List_Category_API = "api/v1/business/";
const store_Configuration_API = "api/v1/private/user/store/";
const Delete_Logo_API = "api/v1/private/user/store/";

const user = Cookies.getJSON("Mtoken");

class Shops {
  getCategories() {
    try {
      return axios.get(
        Base_URL +
          List_Category_API +
          `categories?lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  AddPhysicalStore(
    shop_type_id,
    category_id,
    trade_license,
    store_logo,
    address
  ) {
    try {
      return axios.post(
        Base_URL +
          store_Configuration_API +
          `store-configuration?lang=${localStorage.getItem("MnewLocale")}`,
        {
          shop_type_id,
          category_id,
          trade_license,
          store_logo,
          address,
        },
        //  { headers: authHeader() }
        {
          headers: {
            Authorization: "Bearer " + user.data.token,
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            type: "formData",
          },
        }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  getViewStores(page) {
    try {
      return axios.get(
        Base_URL +
          API_URL +
          `store-configuration?page=${page}&lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  DeleteStoreLogo(store_configuration_id) {
    try {
      return axios.post(
        Base_URL +
          Delete_Logo_API +
          `delete-store-logo?lang=${localStorage.getItem("MnewLocale")}`,
        {
          store_configuration_id,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  // getUpdateStore(ipn_url, success_url, cancel_url, fail_url, store_password) {
  //   return axios.post(Base_URL +
  //     API_URL + `update-configuration?lang=${localStorage.getItem("MnewLocale")}`,
  //     {
  //       ipn_url,
  //       success_url,
  //       cancel_url,
  //       fail_url,
  //       store_password,
  //     },
  //     { headers: authHeader() }
  //   );
  // }
}

export default new Shops();
