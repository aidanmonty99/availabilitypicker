import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar.tsx";

function App() {
  return (
    <>
      <section id="center">
        <Calendar />
      </section>
    </>
  );
}

export default App;
