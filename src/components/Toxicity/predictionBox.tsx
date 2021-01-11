import * as React from 'react'

interface PredictionBoxProps {
    value: number;
    text: string;
}

export const PredictionBox = ({ value, text }) => {
    return (
        <div className="prediction-box">
            <span>{(value * 100).toFixed(2)}%</span>
            <span>{text.replace("_", " ")}</span>
        </div>
    );
}