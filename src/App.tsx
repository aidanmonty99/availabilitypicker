import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar.tsx";
import Menu from "./Menu.tsx";

function App() {
  return (
    <>
      <section id="top">
        <Menu />
      </section>
      <section id="center">
        <Calendar />
      </section>
    </>
  );
}

export default App;
