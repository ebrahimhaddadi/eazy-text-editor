import { useState } from 'react';
import './TableGridPicker.css';

export default function TableGridPicker({ onSelect }) {
  const [hoveredRow, setHoveredRow] = useState(0);
  const [hoveredCol, setHoveredCol] = useState(0);

  const rows = 8;
  const cols = 8;

  return (
    <div className="table-grid-picker">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 20px)` }}
      >
        {[...Array(rows)].map((_, rowIndex) =>
          [...Array(cols)].map((_, colIndex) => {
            const isActive =
              rowIndex <= hoveredRow && colIndex <= hoveredCol;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${isActive ? 'active' : ''}`}
                onMouseEnter={() => {
                  setHoveredRow(rowIndex);
                  setHoveredCol(colIndex);
                }}
                onClick={() =>
                  onSelect({ rows: hoveredRow + 1, cols: hoveredCol + 1 })
                }
              />
            );
          })
        )}
      </div>
      <div className="label">
        {hoveredRow + 1} × {hoveredCol + 1}
      </div>
    </div>
  );
}