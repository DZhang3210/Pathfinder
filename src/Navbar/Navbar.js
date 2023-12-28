import './Navbar.css';
import { UserContext } from '../App.js';
import { useContext } from 'react';

const Navbar = () => {
    const {insert, setInsert, Algo, triggerAlgo, mouseIsDown} = useContext(UserContext);
    return (
        <nav className="navbar">
            <div className = "insert">{insert}</div>
            <button onClick = {()=>setInsert("wall")} className="nav-button">Walls</button>
            <button onClick = {()=>setInsert("bomb")}className="nav-button">Bomb</button>
            <button onClick = {()=>setInsert("start")} className="nav-button">Start</button>
            <button onClick = {()=>setInsert("end")} className="nav-button">End</button> 
        </nav>
    );
};

export default Navbar;
