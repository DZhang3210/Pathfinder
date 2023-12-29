import './Navbar.css';
import { UserContext } from '../App.js';
import { useContext } from 'react';
import GridLegend from './GridLegend.js';

const Navbar = () => {
    const {insert, setInsert, Algo, triggerAlgo, mouseIsDown} = useContext(UserContext);
    return (
        <nav className="navbar">
            <div className = "insert"> Current Insert: {insert}</div>
            <div className = "buttons">
                <button onClick = {()=>setInsert("wall")} className="nav-button">Wall</button>
                <button onClick = {()=>setInsert("start")} className="nav-button">Start</button>
                <button onClick = {()=>setInsert("end")} className="nav-button">End</button>
            </div>
        </nav>
    );
};

export default Navbar;
