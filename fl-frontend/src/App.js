import './App.css';
import Home from './pages/Home';
import FedL from './pages/FedL';
import Stats from './pages/Stats';
import Validation from './pages/Validation';
import NavBar from './components/Navbar';
import videoBg from "./ambulance.mp4";
import { SocketContext, socket } from './context/socket';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <div>
            <NavBar />
            <div className="main">
              <div className="overlay"></div>
              <video src={videoBg} autoPlay loop muted />
              <div className="content">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/fed" element={<FedL />} />
                  <Route exact path="/stats" element={<Stats />} />
                  <Route exact path="/validation" element={<Validation />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
