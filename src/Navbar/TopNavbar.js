import React from 'react';
import './TopNavbar.css'; // Create a new CSS file for styling this navbar
import { useContext } from 'react';
import { UserContext } from '../App.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { useTutorialContext } from '../hooks/useTutorial.js';

const TopNavbar = () => {
    const {insert, setInsert, Algo, triggerAlgo, mouseIsDown} = useContext(UserContext)
    const {stage} = useTutorialContext()
    return (
        <nav className="top-navbar">
            <div className="top-nav-logo"><FontAwesomeIcon icon={faFlag}/>       PathfindingVisualizer</div>
            <div className="top-nav-links" id = {stage===4 ? 'highlight': ''}>
                <button className="top-nav-link"
                onClick = {()=>(triggerAlgo(2))}>Dijkstra</button>
                
                <button className="top-nav-link"
                onClick = {()=>triggerAlgo(3)}>A*</button>
                
                <button className="top-nav-link"
                onClick = {()=>{triggerAlgo(1)}}
                >Reset (Non Walls)</button>

                <button className="top-nav-link"
                onClick = {()=>{triggerAlgo(0)}}
                >Reset</button>
            </div>
        </nav>
    );
};

export default TopNavbar;
