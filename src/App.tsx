import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar.tsx";
import Menu from "./Menu.tsx";
import Account from "./Account.tsx";

function App() {
  return (
    <>
      <section id="top">
        <Menu />
        <Account />
      </section>
      <section id="center">
        <Calendar />
      </section>
    </>
  );
}

export default App;
