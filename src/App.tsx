import { useState } from "react";
import "./App.css";
import Calendar from "./Calendar.tsx";

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
        <Calendar />
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
