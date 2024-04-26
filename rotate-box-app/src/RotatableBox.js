import React, {useRef, useState} from 'react';

const RotatableBox = () => {
    const [rotation, setRotation] = useState(0);
    const boxRef = useRef(null);

    const handleMouseDown = (event) => {
        event.preventDefault();
        const box = boxRef.current.getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;

        const moveHandler = (moveEvent) => {
            const angleInDegrees = calculateRotation(centerX, centerY, moveEvent.clientX, moveEvent.clientY);
            setRotation(angleInDegrees);
        };

        const upHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
    };

    const calculateRotation = (centerX, centerY, currentX, currentY) => {
        const deltaX = currentX - centerX;
        const deltaY = currentY - centerY;
        const angleInRadians = Math.atan2(deltaY, deltaX);
        return (angleInRadians * 180) / Math.PI;
    };

    return (
        <div ref={boxRef} style={{ width: '200px', height: '200px', position: 'relative', margin: '100px auto', transform: `rotate(${rotation}deg)`, background: 'lightblue', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => (
                <div key={corner} style={{ position: 'absolute', width: '20px', height: '20px', backgroundColor: 'red', borderRadius: '50%', cursor: 'pointer',
                    ...(corner === 'top-left' && { top: '-10px', left: '-10px' }),
                    ...(corner === 'top-right' && { top: '-10px', right: '-10px' }),
                    ...(corner === 'bottom-left' && { bottom: '-10px', left: '-10px' }),
                    ...(corner === 'bottom-right' && { bottom: '-10px', right: '-10px' }) }}
                     onMouseDown={handleMouseDown}
                ></div>
            ))}
        </div>
    );
};

export default RotatableBox;
