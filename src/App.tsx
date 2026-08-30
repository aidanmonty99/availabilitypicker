import { useState } from "react";
import "./App.css";
import * as constants from "./constants.ts";
import TwelveHourBlock from "./TwelveHourBlock.tsx";

function App() {
  const [count, setCount] = useState(0);
  const colorProgression = [
    "#34d2eb",
    "#34aeeb",
    "#3499eb",
    "#3480eb",
    "#3471eb",
  ];

  return (
    <>
      <section id="center">
        <table className="calendar">
          <thead>
            <tr>
              {constants.weekdays.map((day) => (
                <th className="column">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TwelveHourBlock("am")}
            {TwelveHourBlock("pm")}
          </tbody>
        </table>
        <button
          type="button"
          className="counter"
          style={{
            backgroundColor:
              count > 0
                ? colorProgression[count % colorProgression.length]
                : undefined,
          }}
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  );
}

export default App;
