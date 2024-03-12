import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<LoginSignup />}/>
      </Routes>
    </Router>
  );
}

export default App;
