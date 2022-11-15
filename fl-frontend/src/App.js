import './App.css';
import Home from './pages/Home';
import videoBg from "./dna.mp4";

function App() {
  return (
    <div>
      <div className="main">
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="content">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
