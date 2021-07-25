
  
  class getHost {

   getHost = () => {
 // const REACT_APP_MY_ENV = process.env.NODE_ENV;
    let REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

    if (typeof REACT_APP_BASE_URL === 'undefined' || REACT_APP_BASE_URL === "" || REACT_APP_BASE_URL === null) {
      REACT_APP_BASE_URL = "https://apigw-merchant.fast-pay.cash/";
    }
  
    return REACT_APP_BASE_URL;
  };

}
  export default new getHost();