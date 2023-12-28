import { useContext} from 'react';
import { UserContext } from '../../App.js';
import {PathContext} from '../PathfindingVisualizer.js'
import './Node.css'

const Node = ({row, column}) => {

    // useEffect(
    //     () =>{
    //         if (isEnd === true){changeNType("end-node")}
    //         else if (isStart === true){changeNType("start-node")}
    //     }, [isStart, isEnd]
    // );

    const style = {
        gridColumnStart: column + 1,
        gridRowStart: row + 1, 
    };

    const {insert, setInsert, Algo, triggerAlgo, mouseIsDown} = useContext(UserContext)
    const {nodes, setCellValue, setEndPoints} = useContext(PathContext)

    const handleClick = () => {
        switch(insert){
            case "wall":
                if (nodes[row][column][2] === "empty" || 
                    nodes[row][column][2] === "bomb") 
                    setCellValue(row, column, "fill-node")
                else if (nodes[row][column][2] === "fill-node")
                    setCellValue(row, column, "empty");
                break;
            case "bomb":
                if (nodes[row][column][2] === "bomb")
                    setCellValue(row, column, "empty")
                else if (nodes[row][column][2] !== "checked" &&
                nodes[row][column][2] !== "start-node" &&
                nodes[row][column][2] !== "end-node" &&
                nodes[row][column][2] !== "path" && 
                nodes[row][column][2] !== "potential")
                    setCellValue(row, column, "bomb");
                break;
            case "start":
                if (nodes[row][column][2] !== "checked" &&
                nodes[row][column][2] !== "end-node")
                    setEndPoints(row, column, true);

                break;
            case "end":
                if (nodes[row][column][2] !== "checked" &&
                nodes[row][column][2] !== "start-node")
                    setEndPoints(row, column, false);
                break;
            
        }
    }


    return (  
        <div className = "grid-node" id = {nodes[row][column][2]} 
        style = {style} onClick = {handleClick}
        onMouseEnter = {mouseIsDown ? handleClick : null}
        > </div>
    );
}
 
export default Node;