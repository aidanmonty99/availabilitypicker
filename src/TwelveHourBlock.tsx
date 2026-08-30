import "./App.css";
import * as constants from "./constants.ts";

function TwelveHourBlock(meridian: "am" | "pm") {
  return (
    <>
      {constants.hours.map((hour) => (
        <tr>
          {constants.weekdays.map((day) => (
            <td className="column cell">
              {constants.minutes.map((minute) => (
                <tr className="column cell">
                  <td className="column">
                    {hour}:{minute}
                    {meridian}
                  </td>
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
