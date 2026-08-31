import "./App.css";
import * as constants from "./constants.ts";
import { useRef, useEffect } from "react";

function TwelveHourBlock(meridian: "am" | "pm") {
  const scrollRef = useRef<HTMLTableCellElement | null>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);
  const defaultScrollHour = "8";
  const defaultScrollMeridian = "am";
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
                {constants.minutes.map((minute) => {
                  const refProp =
                    hour === defaultScrollHour &&
                    meridian === defaultScrollMeridian
                      ? { ref: scrollRef }
                      : {};
                  return (
                    <tr className="column">
                      <td className={`column ${cellType}`} {...refProp}>
                        {hour}:{minute}
                        {meridian}
                      </td>
                    </tr>
                  );
                })}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

export default TwelveHourBlock;
