import './App.css';
import Home from './pages/Home';
import FedL from './pages/FedL';
import videoBg from "./dna.mp4";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="main">
          <div className="overlay"></div>
          <video src={videoBg} autoPlay loop muted />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/fed" element={<FedL />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
