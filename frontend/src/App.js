import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import CreatePost from './Components/Create Post/CreatePost'
import CreateProfile from './Components/Create Profile/CreateProfile'
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<LoginSignup />}/>
        <Route path="/create/post" element={<CreatePost />}/>
        <Route path="/create/profile" element={<CreateProfile />}/>
      </Routes>
    </Router>
  );
}

export default App;
