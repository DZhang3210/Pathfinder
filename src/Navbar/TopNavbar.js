import React from 'react';
import './TopNavbar.css'; // Create a new CSS file for styling this navbar
import { useContext } from 'react';
import { UserContext } from '../App.js';

const TopNavbar = () => {
    const {insert, setInsert, Algo, triggerAlgo, mouseIsDown} = useContext(UserContext)

    return (
        <nav className="top-navbar">
            <div className="top-nav-logo">PathfindingVisualizer</div>
            <div className="top-nav-links">
                <button className="top-nav-link"
                onClick = {()=>{triggerAlgo(0)}}
                >Reset</button>
                
                <button className="top-nav-link"
                onClick = {()=>{triggerAlgo(1)}}
                >Reset (Non Walls)</button>

                <button className="top-nav-link"
                onClick = {()=>(triggerAlgo(2))}>Dijkstra</button>
                
                <button className="top-nav-link"
                onClick = {()=>triggerAlgo(3)}>A*</button>
            </div>
        </nav>
    );
};

export default TopNavbar;
