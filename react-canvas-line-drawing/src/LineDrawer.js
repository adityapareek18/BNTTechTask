import React, { useRef, useEffect, useState } from 'react';

const LineDrawer = () => {
    const canvasRef = useRef(null);
    const [lines, setLines] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }, [lines]);

    const handleCanvasClick = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mousePoint = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        if (drawing) {
            const newLine = { start, end: mousePoint };
            setLines([...lines, newLine]);
            setDrawing(false);
        } else {
            // Start a new line on the first click
            setStart(mousePoint);
            setDrawing(true);
        }
    };

    const handleDeleteLine = (index) => {
        const newLines = lines.filter((_, i) => i !== index);
        setLines(newLines);
    };

    return (
        <div style={{ display: 'flex', padding: '10px', alignItems: 'flex-start' }}>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onClick={handleCanvasClick}
                style={{ border: '1px solid black', flexShrink: 0 }} // Prevent canvas from shrinking
            />
            <div style={{ marginLeft: '20px', overflowY: 'auto', maxHeight: '600px', width: '200px' }}>
                {lines.map((line, index) => (
                    <div key={index} style={{ margin: '5px 0' }}>
                        Line {index + 1}: Start ({line.start.x.toFixed(0)}, {line.start.y.toFixed(0)}) to
                        End ({line.end.x.toFixed(0)}, {line.end.y.toFixed(0)})
                        <button onClick={() => handleDeleteLine(index)} style={{ marginLeft: '10px' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LineDrawer;
