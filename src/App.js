import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from "./components/UI/Navbar/Navbar";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <HomePage></HomePage>
      </BrowserRouter>
    </div>
  );
}

export default App;
