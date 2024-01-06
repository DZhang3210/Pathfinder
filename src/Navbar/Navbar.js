import './Navbar.css';
import { UserContext } from '../App.js';
import { useContext } from 'react';
import GridLegend from './GridLegend.js';
import { useTutorialContext } from '../hooks/useTutorial.js';

const Navbar = () => {
    const {insert, setInsert, Algo, triggerAlgo, mouseIsDown} = useContext(UserContext);
    const {stage}= useTutorialContext()
    return (
        <nav className="navbar" id = {stage===1 || stage === 2? 'highlight1': ''}>
            <div className = "insert" id = {stage === 2? 'hinsert': ''}> 
                Current Insert: {insert}
            </div>
            <div className = "buttons" id = {stage === 1? 'hbutton': ''}>
                <button onClick = {()=>setInsert("wall")} className="nav-button">Wall</button>
                <button onClick = {()=>setInsert("start")} className="nav-button">Start</button>
                <button onClick = {()=>setInsert("end")} className="nav-button">End</button>
            </div>
        </nav>
    );
};

export default Navbar;
