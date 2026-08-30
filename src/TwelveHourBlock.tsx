import "./App.css";
import * as constants from "./constants.ts";

function TwelveHourBlock(meridian: "am" | "pm") {
  return (
    <>
      {constants.hours.map((hour) => (
        <tr>
          {constants.weekdays.map((day) => {
            const cellType =
              day === "Sunday" || day === "Saturday"
                ? "exterior-cell"
                : "interior-cell";
            return (
              <td className="column">
                {constants.minutes.map((minute) => (
                  <tr className="column">
                    <td className={`column ${cellType}`}>
                      {hour}:{minute}
                      {meridian}
                    </td>
                  </tr>
                ))}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default TwelveHourBlock;
