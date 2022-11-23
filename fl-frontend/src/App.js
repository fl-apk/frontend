import './App.css';
import Home from './pages/Home';
import FedL from './pages/FedL';
import Stats from './pages/Stats';
import videoBg from "./ambulance.mp4";
import { SocketContext, socket } from './context/socket';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <div>
          <div className="main">
            <div className="overlay"></div>
            <video src={videoBg} autoPlay loop muted />
            <div className="content">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/fed" element={<FedL />} />
                <Route exact path="/stats" element={<Stats />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </SocketContext.Provider>

  );
}

export default App;
