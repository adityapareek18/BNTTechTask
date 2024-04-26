import React, { useRef, useEffect, useState } from 'react';

const RotatableBox = () => {
    const canvasRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [mouseStart, setMouseStart] = useState({ x: 0, y: 0 });
    const [center, setCenter] = useState({ x: 150, y: 150 }); // Initial center of the box
    const boxSize = 100;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawBox(ctx, center, rotation, boxSize);

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [center, rotation]);

    const drawBox = (ctx, center, rotation, size) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.fillStyle = '#000';
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
    };

    const handleMouseDown = (event) => {
        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        setMouseStart({ x: mouseX, y: mouseY });
        setIsDragging(true);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        const rect = event.target.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const dx = mouseX - mouseStart.x;
        const dy = mouseY - mouseStart.y;

        // Calculating the angle of rotation based on mouse movement
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        setRotation(rotation + angle);
        setMouseStart({ x: mouseX, y: mouseY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <canvas
            ref={canvasRef}
            width="300"
            height="300"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ border: '1px solid black' }}
        />
    );
};

export default RotatableBox;
