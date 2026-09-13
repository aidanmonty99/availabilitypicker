import "./App.css";
import * as constants from "./constants.ts";
import { useRef, useState, useEffect } from "react";

function Calendar() {
  const tableDataRef = useRef<HTMLTableSectionElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [selectionRect, setSelectionRect] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set<string>(),
  );
  const handlePointerDown = (e: React.PointerEvent<HTMLTableCellElement>) => {
    if (e.button !== 0 || !tableDataRef.current) {
      return;
    }
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }
    // const rect = tableDataRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    console.log(`Pressed at x: ${x}, y: ${y}`);

    setIsSelecting(true);
    setStartPos({ x, y });
    setSelectionRect({ top: y, bottom: y, left: x, right: x });
  };

  const checkCollisions = (selectRect: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }) => {
    const dataContainer = tableDataRef.current;
    if (!dataContainer) return;
    const cells = dataContainer.querySelectorAll(".cell");
    const newlySelected = new Set<string>();

    for (const cell of cells) {
      const id: string = cell.getAttribute("id");
      if (!id || id !== "Wednesday-15:00") continue;

      const cellRect = cell.getBoundingClientRect();

      // Check overlapping boundaries
      const isOverlapping = !(
        cellRect.left > selectRect.right ||
        cellRect.right < selectRect.left ||
        cellRect.top > selectRect.bottom ||
        cellRect.bottom < selectRect.top
      );

      if (isOverlapping) {
        newlySelected.add(id);
      }
    }

    // console.log(`newlySelected: ${JSON.stringify([...newlySelected])}`);

    setSelectedIds(newlySelected);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLTableCellElement>) => {
    if (!isSelecting) return;
    // const rect = tableDataRef.current.getBoundingClientRect();
    const currentX = e.clientX;
    const currentY = e.clientY;

    const top = Math.min(startPos.y, currentY);
    const left = Math.min(startPos.x, currentX);
    const right = Math.max(startPos.x, currentX);
    const bottom = Math.max(startPos.y, currentY);

    const newRect = { left, top, right, bottom };
    setSelectionRect(newRect);
    checkCollisions(newRect);
  };

  const handlePointerUp = () => {
    setIsSelecting(false);
    console.log(`selectionRect: ${JSON.stringify(selectionRect)}`);
  };

  const scrollRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  const defaultScrollTimeslot = "08:00";

  return (
    <>
      <div className="table-wrapper">
        <table className="calendar">
          <thead>
            <tr>
              {constants.weekdays.map((day) => (
                <th className="column">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody ref={tableDataRef}>
            {Object.keys(constants.timeSlots).map((timeslot) => {
              const refProp =
                timeslot === defaultScrollTimeslot ? { ref: scrollRef } : {};
              return (
                <tr {...refProp}>
                  {constants.weekdays.map((day) => {
                    const cellType =
                      day === "Sunday" || day === "Saturday"
                        ? "exterior-cell"
                        : "interior-cell";
                    return (
                      <td
                        className={`column cell ${cellType}`}
                        id={`${day}-${timeslot}`}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                      >
                        {constants.timeSlots[timeslot]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Calendar;
