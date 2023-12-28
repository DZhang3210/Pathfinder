import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer.js'
import Navbar from './Navbar/Navbar.js';
import { createContext, useState, useEffect} from 'react';
import TopNavbar from './Navbar/TopNavbar.js';
export const UserContext = createContext(null)
function App() {
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
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    </UserContext.Provider>
  );
}

export default App;
