import { Shell } from "@/widgets/shell";
import { useState, useCallback, useRef } from "react";

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export const TerminalPage: React.FC = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start selection if clicking on the background (not on the shell)
    if (e.target === e.currentTarget) {
      setIsSelecting(true);
      setSelectionBox({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY,
      });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isSelecting && selectionBox) {
        setSelectionBox({
          ...selectionBox,
          currentX: e.clientX,
          currentY: e.clientY,
        });
      }
    },
    [isSelecting, selectionBox]
  );

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
    // Keep the selection box visible for a brief moment before fading out
    setTimeout(() => {
      setSelectionBox(null);
    }, 200);
  }, []);

  // Calculate selection box dimensions
  const getSelectionStyle = (): React.CSSProperties => {
    if (!selectionBox) return { display: "none" };

    const left = Math.min(selectionBox.startX, selectionBox.currentX);
    const top = Math.min(selectionBox.startY, selectionBox.currentY);
    const width = Math.abs(selectionBox.currentX - selectionBox.startX);
    const height = Math.abs(selectionBox.currentY - selectionBox.startY);

    return {
      position: "fixed",
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      pointerEvents: "none",
    };
  };

  return (
    <div
      ref={pageRef}
      className="terminal-page w-full h-screen overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Shell />
      {selectionBox && (
        <div
          className={`selection-box ${isSelecting ? "active" : "fading"}`}
          style={getSelectionStyle()}
        />
      )}
    </div>
  );
};
