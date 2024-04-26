import React from 'react';

const ProgressBar = ({ progress }) => {
    const containerStyles = {
        backgroundColor: '#ddd',
        height: '10px',
        width: '100%'
    };

    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: progress === 100 ? '#28a745' : '#007bff'
    };

    const labelStyles = {
        padding: '5px',
        color: 'black',
        fontWeight: 'bold'
    };

    return (
        <div>
            <div style={containerStyles}>
                <div style={fillerStyles} />
            </div>
            <div style={labelStyles}>{progress}% Complete</div>
        </div>
    );
};

export default ProgressBar;
