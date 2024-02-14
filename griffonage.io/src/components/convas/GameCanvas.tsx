// eslint-disable-next-line import/no-extraneous-dependencies
import Konva from 'konva';
import React, { useEffect } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { useParams } from 'react-router-dom';
import { socket } from '../../socket.ts';
import { useGameContext } from '../../contexts/GameContext.tsx';
import type { Line as Pouet } from '../../types/Line.tsx';

function GameCanvas(): React.JSX.Element {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState<Pouet[]>([]);
  const [stage, setStage] = React.useState<Konva.Stage | null>();
  const [strokeWidth, setStrokeWidth] = React.useState(15);
  const [strokeColor, setStrokeColor] = React.useState('#000000');
  const { user } = useGameContext();
  const isDrawing = React.useRef(false);
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit('getLines', roomId);

    socket.on('getLines', (allLines: Pouet[]) => {
      setLines(allLines);
    });
  }, [user]);

  const handleMouseDown = () => {
    isDrawing.current = true;
    // check player is the one drawing here
    if (stage) {
      const pos = stage.getPointerPosition();
      setLines([...lines, {
        tool, points: [pos?.x, pos?.y], strokeWidth, strokeColor, closed: false, fill: undefined,
      }]);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    setStage(e.target.getStage());
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    if (stage) {
      const point = stage.getPointerPosition();
      if (point) {
        const lastLine = lines[lines.length - 1];

        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    socket.emit('setLines', lines, roomId);

    socket.emit('getLines', roomId);

    socket.on('getLines', (currentLines: Pouet[]) => {
      setLines(currentLines.concat());
    });
  };

  const handleClear = () => {
    if (stage) {
      stage.clear();
      setLines([]);

      socket.emit('clear', roomId);
      socket.on('clear', (currentLines: Pouet[]) => {
        setLines(currentLines.concat());
      });
    }
  };

  const handleLineClick = (index: number) => {
    lines[index].closed = !lines[index].closed;
    if (lines[index].closed) {
      lines[index].fill = strokeColor;
      setLines(lines);
      return;
    }
    delete lines[index].fill;
    setLines(lines);
  };

  return (
    <div>
      <div className="border-4 border-white bg-white rounded-md">
        <Stage
          width={1000}
          height={625}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke={line.strokeColor}
                strokeWidth={line.strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
                closed={line.closed}
                fill={line.closed ? line.fill : undefined}
                onClick={() => handleLineClick(index)}
              />
            ))}
          </Layer>
        </Stage>
        <div className="border-t-2 border-black ">
          <select
            className="m-2"
            value={tool}
            onChange={(e) => {
              setTool(e.target.value);
            }}
          >
            <option value="pen">Stylo</option>
            <option value="eraser">Gomme</option>
          </select>

          <select
            className="m-2"
            value={strokeWidth}
            onChange={(e) => {
              setStrokeWidth(+e.target.value);
            }}
          >
            <option value="5">Petit</option>
            <option value="15">Moyen</option>
            <option value="30">Grand</option>
            <option value="45">Large</option>
          </select>

          <select
            className="m-2"
            value={strokeColor}
            onChange={(e) => {
              setStrokeColor(e.target.value);
            }}
          >
            <option value="#000000">Black</option>
            <option value="#6b7280">Gray</option>
            <option value="#22c55e">Green</option>
            <option value="#3b82f6">Blue</option>
            <option value="#dc2626">Red</option>
            <option value="#facc15">Yellow</option>
            <option value="#f472b6">Pink</option>
          </select>
          <button type="button" onClick={handleClear}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default GameCanvas;
