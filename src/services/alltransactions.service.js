import axios from "axios";
import authHeader from "./auth-header";
import hostAPI from "./GetHost";
import Cookies from "js-cookie";

let Base_URL = `${hostAPI.getHost()}`;

const APIrefundmony_URL = "api/v1/private/transaction/refund-payment/";
const APIdepositmoney_URL = "api/v1/private/transaction/deposit/via-fastlink/";
const APIwithdrawmoney_URL = "api/v1/private/transaction/cash-out/via-agent/";
const APIrecievemoney_URL = "api/v1/private/transaction/request-money/";
const APIbundlepurchase_URL = "api/v1/private/transaction/bundle-purchase/";
const APIreqPayment_URL = "api/v1/private/transaction/receive-payment/";
// const APIreqExecute_URL = "api/v1/private/transaction/qr-payment/";

class MoneyService {
  //Refund Money
  refundMoneySummary(receiver_mobile_number, invoice_id, amount) {
    try {
      receiver_mobile_number =
        "+964" + receiver_mobile_number.split(" ").join("");
      amount = amount.split(",").join("");

      return axios.post(
        Base_URL +
          APIrefundmony_URL +
          `summary?lang=${localStorage.getItem("MnewLocale")}`,
        {
          receiver_mobile_number,
          invoice_id,
          amount,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  refundMoney(receiver_mobile_number, amount, invoice_id, pin) {
    try {
      receiver_mobile_number =
        "+964" + receiver_mobile_number.split(" ").join("");
      amount = amount.split(",").join("");

      return axios.post(
        Base_URL +
          APIrefundmony_URL +
          `execute?lang=${localStorage.getItem("MnewLocale")}`,
        {
          receiver_mobile_number,
          amount,
          invoice_id,
          pin,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  // Request (QR) Payment
  ReqGenerateQR(invoice_number, amount) {
    try {
      amount = amount.split(",").join("");

      return axios.post(
        Base_URL +
          APIreqPayment_URL +
          `qr?lang=${localStorage.getItem("MnewLocale")}`,
        {
          invoice_number,
          amount,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  // ReqExecute(qr_text, amount, pin){
  //   amount = amount.split(",").join("");

  //   return axios.post(
  //     Base_URL + APIreqExecute_URL + "execute",
  //     {
  //       qr_text,
  //       amount,
  //       pin
  //     },
  //     { headers: authHeader() }
  //   );
  // }

  //Request (receive) Money
  receiveMoneySummary(requestee_mobile_number, amount) {
    try {
      requestee_mobile_number =
        "+964" + requestee_mobile_number.split(" ").join("");
      amount = amount.split(",").join("");

      return axios.post(
        Base_URL +
          APIrecievemoney_URL +
          `summary?lang=${localStorage.getItem("MnewLocale")}`,
        {
          requestee_mobile_number,
          amount,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  receiveMoney(requestee_mobile_number, amount, pin) {
    try {
      requestee_mobile_number =
        "+964" + requestee_mobile_number.split(" ").join("");
      amount = amount.split(",").join("");

      return axios.post(
        Base_URL +
          APIrecievemoney_URL +
          `execute?lang=${localStorage.getItem("MnewLocale")}`,
        {
          requestee_mobile_number,
          amount,
          pin,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  // Deposit Money
  depositMoney(card_number) {
    try {
      return axios.post(
        Base_URL +
          APIdepositmoney_URL +
          `execute?lang=${localStorage.getItem("MnewLocale")}`,
        {
          card_number,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  //Withdraw Money
  withdrawMoneySummary(receiver_mobile_number, amount) {
    try {
      receiver_mobile_number =
        "+964" + receiver_mobile_number.split(" ").join("");
      amount = amount.split(",").join("");

      return axios.post(
        Base_URL +
          APIwithdrawmoney_URL +
          `summary?lang=${localStorage.getItem("MnewLocale")}`,
        {
          receiver_mobile_number,
          amount,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  withdrawMoney(receiver_mobile_number, amount, pin) {
    try {
      receiver_mobile_number =
        "+964" + receiver_mobile_number.split(" ").join("");
      amount = amount.split(",").join("");

      return axios.post(
        Base_URL +
          APIwithdrawmoney_URL +
          `execute?lang=${localStorage.getItem("MnewLocale")}`,
        {
          receiver_mobile_number,
          amount,
          pin,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  //Bundle Purchase
  bundlePurchaseSummary(operator_id, bundle_id) {
    try {
      return axios.post(
        Base_URL +
          APIbundlepurchase_URL +
          `summary?lang=${localStorage.getItem("MnewLocale")}`,
        {
          operator_id,
          bundle_id,
        },
        { headers: authHeader() }
      );
    } catch (error) {
      Cookies.remove("Mtoken");
      localStorage.clear();
      window.location.reload();
    }
  }

  bundlePurchase(operator_id, bundle_id, pin) {
    try {
      return axios.post(
        Base_URL +
          APIbundlepurchase_URL +
          `execute?lang=${localStorage.getItem("MnewLocale")}`,
        {
          operator_id,
          bundle_id,
          pin,
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

export default new MoneyService();
