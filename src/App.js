import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer.js'
import Navbar from './Navbar/Navbar.js';
import { createContext, useState, useEffect} from 'react';
import TopNavbar from './Navbar/TopNavbar.js';
import GridLegend from './Navbar/GridLegend.js';
import {useTutorialContext} from './hooks/useTutorial'

export const UserContext = createContext(null)
function App() {
  const [text, setText] = useState('')
  const steps = [
    "Welcome to my pathfinding visualizer, this is a quick guide to get you started",
    'These are all the blocks you can insert onto the grid, just select one and tap the grid. You can try tapping one right now',
    'This is the current grid your inserting',
    'This is a key which tells you which blocks do what',
    'Press either of these to commence an action on the board', 
    'Thanks for visiting. Have Fun!'
  ]
  const {stage, dispatch} = useTutorialContext();

  const handleClick = () =>{
    dispatch({type: 'INC'})
    //console.log(stage)
  }

  useEffect(()=>{
    setText(steps[stage])
  }, [stage])
  

  const [insert, setInsert] = useState ("wall")
  //0 = Reset
  //1 = BFS
  //2 = Dijkstra
  //3 = A*
  const [Algo, triggerAlgo] = useState(-1)

  const [mouseIsDown, setMouseIsDown] = useState(false);

    const handleMouseDown = () => {
        setMouseIsDown(true);
    };

    const handleMouseUp = () => {
        setMouseIsDown(false);
    };
    useEffect(() => {
      // Attach event listeners to the window
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      
  }, []);

  return (
      <UserContext.Provider value = {{insert, setInsert, Algo, triggerAlgo, mouseIsDown}}>
        <div className="App">
          <TopNavbar></TopNavbar>
          <Navbar></Navbar> 
          <GridLegend/>
          <PathfindingVisualizer></PathfindingVisualizer>
        </div>
        {(stage < steps.length) ? <div className = "tutorial" onClick = {handleClick}>
          <div className = "reminder_box">
            <h3>User Tutorial</h3>
            <p>{text}</p>
            {stage == 0 ? <img src='/pathfinder_demo.gif' alt = "gif"/> : <></>}
          </div>
        </div>: <></>}
      </UserContext.Provider>
  );
}

export default App;
