import "./App.css";
import * as constants from "./constants.ts";
import { useRef, useState, useEffect } from "react";

function Calendar() {
  const tableDataRef = useRef<HTMLTableSectionElement>(null);
  type selectionAction = "add" | "remove" | "none";
  const [currentSelectionAction, setSelectionAction] =
    useState<selectionAction>("none");
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
  const [tempSelectedIds, setTempSelectedIds] = useState<Set<string>>(
    new Set<string>(),
  );
  const handlePointerDown = (e: React.PointerEvent<HTMLTableCellElement>) => {
    if (e.button !== 0 || !tableDataRef.current) {
      return;
    }
    setTempSelectedIds(new Set<string>());
    const cellIsSelected = e.currentTarget.classList.contains("selected");
    const selectionAction: selectionAction = cellIsSelected ? "remove" : "add";
    setSelectionAction(selectionAction);
    const x = e.clientX;
    const y = e.clientY;

    setStartPos({ x, y });
    setSelectionRect({ top: y, bottom: y, left: x, right: x });
    checkCollisions();
  };

  const checkCollisions = () => {
    const dataContainer = tableDataRef.current;
    if (!dataContainer) return;
    const cells = dataContainer.querySelectorAll(".cell");

    for (const cell of cells) {
      const id: string = cell.getAttribute("id");
      const cellRect = cell.getBoundingClientRect();

      // Check overlapping boundaries
      const isOverlapping = !(
        cellRect.left > selectionRect.right ||
        cellRect.right < selectionRect.left ||
        cellRect.top > selectionRect.bottom ||
        cellRect.bottom < selectionRect.top
      );

      const addNewId = currentSelectionAction === "add" && isOverlapping;
      const removeTempId = !isOverlapping && tempSelectedIds.has(id);
      const removePreviousSelectedId =
        isOverlapping && currentSelectionAction === "remove";

      if (addNewId) {
        tempSelectedIds.add(id);
        cell.classList.add("selected");
      } else if (removeTempId || removePreviousSelectedId) {
        tempSelectedIds.delete(id);
        cell.classList.remove("selected");
      }
    }

    setSelectedIds(tempSelectedIds);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLTableCellElement>) => {
    const currentX = e.clientX;
    const currentY = e.clientY;

    const top = Math.min(startPos.y, currentY);
    const left = Math.min(startPos.x, currentX);
    const right = Math.max(startPos.x, currentX);
    const bottom = Math.max(startPos.y, currentY);

    const newRect = { left, top, right, bottom };
    setSelectionRect(newRect);
    checkCollisions();
  };

  const handlePointerUp = () => {
    setSelectionAction("none");
    checkCollisions();
    setTempSelectedIds(new Set<string>());
  };

  const scrollRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  const defaultScrollTimeslot = "08:00";

  return (
    <>
      <div className="calendar-wrapper">
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
