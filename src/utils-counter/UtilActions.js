import Cookies from "js-cookie";


export const isAuthenticate = () => {
    if (typeof window === undefined) {
        return false;
    }

    if (Cookies.get("counter_acc")) {
        return Cookies.getJSON("counter_acc");
    } else {
        return false;
    }
};
