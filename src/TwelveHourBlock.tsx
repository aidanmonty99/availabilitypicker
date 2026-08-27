import "./App.css";
import * as constants from "./constants.ts";

function TwelveHourBlock(meridian: "am" | "pm") {
  return (
    <>
      {constants.hours.map((hour) => (
        <tr>
          {constants.weekdays.map((day) => (
            <td className="column">
              {constants.minutes.map((minute) => (
                <tr className="cell">
                  {hour}:{minute}
                  {meridian}
                </tr>
              ))}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default TwelveHourBlock;
