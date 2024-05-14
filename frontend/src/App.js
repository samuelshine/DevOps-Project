import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import CreatePost from './Components/Create Post/CreatePost'
import CreateProfile from './Components/Create Profile/CreateProfile'
import ProfilePage from './Components/Profile Page/ProfilePage'
import Sidebar from './Components/Sidebar/Sidebar'; // Import Sidebar component
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Render the Sidebar outside of the Routes */}
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/login" element={<LoginSignup />}/>
        <Route path="/create/post" element={<CreatePost />}/>
        <Route path="/create/profile" element={<CreateProfile />}/>
        <Route path="/profile/:username" element={<ProfilePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
