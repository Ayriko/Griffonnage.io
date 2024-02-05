import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Konva from "konva";


const GameCanvas: React.FC = () => {
    type Line = {
        tool: string;
        points: (number | undefined)[];
    };
    const [tool, setTool] = React.useState('pen');
    const [lines, setLines] = React.useState<Line[]>([]);
    const [stage, setStage] = React.useState<Konva.Stage | null>();
    const isDrawing = React.useRef(false);

    const handleMouseDown = () => {
        isDrawing.current = true;
        if (stage) {
            const pos = stage.getPointerPosition();
            setLines([...lines, { tool, points: [pos?.x, pos?.y] }]);
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
                let lastLine = lines[lines.length - 1];

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
    };

    const handleClear = () => {
        if (stage) {
            stage.clear();
            setLines([]);
        }
    }

    return (
        <div>
            <div className="border-4 border-black">
                <Stage
                    width={850}
                    height={625}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <Layer>
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke="#df4b26"
                                strokeWidth={5}
                                tension={0.5}
                                lineCap="round"
                                lineJoin="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                            />
                        ))}
                    </Layer>
                </Stage>
                <div className="border-t-4 border-black">
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
                    <button onClick={handleClear}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default GameCanvas;