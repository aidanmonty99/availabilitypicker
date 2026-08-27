import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const colorProgression = [
    "#34d2eb",
    "#34aeeb",
    "#3499eb",
    "#3480eb",
    "#3471eb",
  ];

  const hours: string[] = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  const minutes: string[] = ["00", "30"];
  const weekdays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <section id="center">
        <table className="calendar">
          <tr>
            {weekdays.map((day) => (
              <th className="column">{day}</th>
            ))}
          </tr>
          {hours.map((hour) => (
            <tr>
              {weekdays.map((day) => (
                <td className="column">
                  {minutes.map((minute) => (
                    <tr>
                      <td className="cell">
                        {hour}:{minute}am
                      </td>
                      <td className="cell">
                        {hour}:{minute}pm
                      </td>
                    </tr>
                  ))}
                </td>
              ))}
            </tr>
          ))}
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

      <div className="ticks"></div>

      <section id="spacer"></section>
    </>
  );
}

export default App;
