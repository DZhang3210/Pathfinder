import { useState, createContext, useEffect, useContext, useRef} from 'react';
import Node from './Node/Node.js';
import './PathfindingVisualizer.css';
import { SpreadOut } from './Algorithms/SpreadOut.js';
import { AStar } from './Algorithms/AStar.js';
import { UserContext } from '../App.js';
export const PathContext = createContext({ width: 0, height: 0 });

const PathfindingVisualizer = () => {
    // Each grid node is 30x30
    const elementRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    
    //Trying to get dynamic graph
    useEffect(() => {
        if (elementRef.current) {
            //console.log("Item: " + elementRef.current)
            //const { offsetWidth, offsetHeight } = elementRef.current;
            setSize({ width: elementRef.current.offsetWidth, 
            height: elementRef.current.offsetHeight});
        }
    }, []);
    //console.log(size.height + "  " + size.width)
    const rows = Math.floor(size.height / 30), cols = Math.floor(size.width / 30);
    // const rows = 20;
    // const cols = 40;

    const [sp, setSP] = useState([10, 10]) // Start position
    const [ep, setEP] = useState([5, 20]); // End position
    const {insert, setInsert, Algo, triggerAlgo, mouseIsDown}  = useContext(UserContext)

    //Starting
    //Ending
    //Checked
    //Node
    const style = {
        gridTemplateRows: `repeat(${rows}, 25px)`, // Use camelCase and template literals
        gridTemplateColumns: `repeat(${cols}, 25px)` // Use camelCase and template literals
    };
    
    const createGrid = () => {
        return Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => (
                [
                false,
                <Node 
                    key={`${row}-${col}`} 
                    row={row} 
                    column={col}
                />,
                (row === sp[0] && col === sp[1]) ? "start-node" :
                    (row === ep[0] && col === ep[1]) ? "end-node":
                    "empty"
                ]
            )));
        };
        
 
    const [nodes, modifyNodes] = useState(createGrid); 
    const modifyGrid = async (grid) => {
        modifyNodes(grid)
    }
    const createWGrid = () => {
        return Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => (
                [
                false,
                <Node 
                    key={`${row}-${col}`} 
                    row={row} 
                    column={col}
                />,
                (row === sp[0] && col === sp[1]) ? "start-node" :
                    (row === ep[0] && col === ep[1]) ? "end-node":
                    (nodes[row][col][2] === "fill-node") ? "fill-node":
                    "empty"
                ]
            )));
        }; 
    const setCellValue = (row, col, value) => {
        modifyNodes(nodes => {
                const newArray = nodes.map(innerArray => [...innerArray]);
                newArray[row][col][2] = value;
                return newArray;
            });
        };
    //If start === true then modify start node otherwise modify endnode
    const setEndPoints = (row, col, start) => {
        modifyNodes(nodes => {
                const newArray = nodes.map(innerArray => [...innerArray]);
                if (start === true){
                    newArray[sp[0]][sp[1]][2] = "empty"
                    setSP([row, col])
                } 
                else{
                    newArray[ep[0]][ep[1]][2] = "empty"
                    setEP([row, col])
                }

                newArray[row][col][2] = (start === true) ? "start-node" : "end-node"
                return newArray;
            });
        };

    const [running, setRunning] = useState(false)
    const isInitialMount = useRef(true)
    useEffect(() => {
        const runAlgorithm = async () =>{
        if (isInitialMount.current){
            isInitialMount.current = false;
        }else if (!running){
            switch(Algo){
                case 0:
                    setRunning(true);
                    modifyGrid(createGrid)
                    setRunning(false);
                    triggerAlgo(-1)
                    break;
                case 1:
                    setRunning(true);
                    modifyGrid(createWGrid)
                    setRunning(false)
                    triggerAlgo(-1)
                    break;
                case 2:
                    setRunning(true)
                    await SpreadOut(sp[0], sp[1], nodes, rows, cols, setCellValue)
                    setRunning(false)
                    triggerAlgo(-1)
                    break;
                case 3:
                    setRunning(true)
                    await AStar(ep[0], ep[1], sp[0], sp[1], rows, cols, nodes, setCellValue) 
                    setRunning(false)
                    triggerAlgo(-1)
                    break;
                default:
                    break;
            
            }}}
        runAlgorithm();
    }, [Algo, setRunning]
    )

    //Trying to get dynamic graph
    useEffect(() => {
        modifyNodes(createGrid());
    }, [size]);

    return (
        <PathContext.Provider value={{nodes, setCellValue, setEndPoints}}>
            <div className = "grid-wrapper" ref = {elementRef}>
                <div className="grid" style = {style} >
                    {nodes.map(rowNodes => rowNodes.map(node => node[1]))}
                </div>
            </div>
        </PathContext.Provider>
    );
};

export default PathfindingVisualizer;
