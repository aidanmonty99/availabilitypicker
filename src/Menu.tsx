import "./App.css";
import * as constants from "./constants.ts";
import { useRef, useState, useEffect } from "react";

function Menu() {
  return (
    <>
      <div id="menu">
        <div className="menu-bar" />
        <div className="menu-space" />
        <div className="menu-bar" />
        <div className="menu-space" />
        <div className="menu-bar" />
      </div>
    </>
  );
}

export default Menu;
