import React from "react";
import ReactDom from "react-dom";
import Component from "./Component.js";
// import Component1 from "./Component1.js";
import ButtonComponent from "./ButtonComponent.js"
import AnimatedNumber from './AnimatedNumber.jsx'
import "./style.css"
import { myTimer, TimerContext } from "./store.js";



const App = () => {
  return (
    <TimerContext.Provider value={myTimer}>
      {/* <Component /> */}
      {/* <Component1 /> */}
      {/* <ButtonComponent /> */}
      <AnimatedNumber />
    </TimerContext.Provider>
  )
};

ReactDom.render(<App />, document.getElementById("app"));
