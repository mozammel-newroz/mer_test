import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import Kurdish from "../lang/kr.json";
import Arabic from "../lang/ar.json";
import English from "../lang/en.json";
import DirectionProvider, {
  DIRECTIONS,
} from "react-with-direction/dist/DirectionProvider";

export const Context = React.createContext();

// const local = navigator.language;
let local = localStorage.getItem("MnewLocale");
if (local === null) {
  local = navigator.language;
  localStorage.setItem("MDirection", "ltr");
}
// if (navigator.language !== null) {
//   local = navigator.language;
// } else {
//   localStorage.getItem("MnewLocale");
// }

let lang;
if (local === "en" || local === "en-GB") {
  lang = English;
} else {
  if (local === "kr") {
    lang = Kurdish;
  } else if (local === "ar") {
    lang = Arabic;
  }
}

let newDir = localStorage.getItem("MDirection");

const Wrapper = (props) => {
  const [locale, setLocale] = useState(local);

  const [messages, setMessages] = useState(lang);

  const [direction, setDirection] = useState(newDir);

  function selectLanguage(e) {
    const newLocale = e.target.value;
    setLocale(newLocale);

    let dir;

    if (newLocale === "en") {
      setMessages(English);
      dir = document.getElementById("demo").style.direction = "ltr";
      setDirection(dir);
      document.getElementById("demo").style.textAlign = "left";
      document.getElementById("demo").style.right = "0";
    } else {
      if (newLocale === "kr") {
        setMessages(Kurdish);
        dir = document.getElementById("demo").style.direction = "rtl";
        setDirection(dir);
        document.getElementById("demo").style.textAlign = "right";
        document.getElementById("demo").style.left = "0";
      } else {
        setMessages(Arabic);
        dir = document.getElementById("demo").style.direction = "rtl";
        setDirection(dir);
        document.getElementById("demo").style.textAlign = "right";
        document.getElementById("demo").style.left = "0";
      }
    }
    localStorage.setItem("MnewLocale", newLocale);
    localStorage.setItem("MDirection", dir);
  }

  return (
    <DirectionProvider
      direction={
        localStorage.getItem("MDirection") === "ltr"
          ? DIRECTIONS.LTR
          : DIRECTIONS.RTL
      }
    >
      <Context.Provider value={{ locale, selectLanguage }}>
        <IntlProvider messages={messages} locale={locale} direction={direction}>
          <div id="demo">{props.children}</div>
        </IntlProvider>
      </Context.Provider>
    </DirectionProvider>
  );
};

export default Wrapper;
