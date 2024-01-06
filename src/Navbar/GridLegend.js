import React from 'react';
import './GridLegend.css';
import { useTutorialContext } from '../hooks/useTutorial';

const GridLegend = () => {
    const {stage} = useTutorialContext()
    return (
        <div className = "legend-wrapper"id = {stage===3 ? 'highlight': ''}>
        <div className="grid-legend">
            <div className="legend-item">
                <div className="legend-color start"></div>
                <div className="legend-label">Start (Red)</div>
            </div>
            <div className="legend-item">
                <div className="legend-color end"></div>
                <div className="legend-label">End (Green)</div>
            </div>
            <div className="legend-item">
                <div className="legend-color wall"></div>
                <div className="legend-label">Wall (Black)</div>
            </div>
            <div className="legend-item">
                <div className="legend-color empty"></div>
                <div className="legend-label">Empty (White)</div>
            </div>
        </div>
        </div>
    );
};

export default GridLegend;
