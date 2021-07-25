import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const API_URL = "api/v1/private/user/transaction/";
const API_TypeURL = "api/v1/private/transaction/";

class TransactionService {
  getTransactions(id, tx_with, amount, type, status, from_date, to_date, page) {
    try {
      return axios.get(
        Base_URL +
          API_URL +
          `history?id=${id}&tx_with=${tx_with}&amount=${amount}&type=${type}&status=${status}&from_date=${from_date}&to_date=${to_date}&page=${page}&lang=${localStorage.getItem(
            "MnewLocale"
          )}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  getTransactionType() {
    try {
      return axios.get(
        Base_URL +
          API_TypeURL +
          `transaction-types?lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  getTransactionStatus() {
    try {
      return axios.get(
        Base_URL +
          API_TypeURL +
          `transaction-statuses?lang=${localStorage.getItem("MnewLocale")}`,
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }
}

export default new TransactionService();
