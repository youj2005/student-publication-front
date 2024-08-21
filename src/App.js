import './App.css';
import SignupPage from './pages/SignupPage';
import MissionStatement from './pages/MissionStatement';
import Category from './pages/Category';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from './pages/Post';
import Article from './pages/Article';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/missionstatement" element={<MissionStatement />} />
        <Route path="/category/:name" element={<Category/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/post" element={<Post/>} />
        <Route path="*" element={<Home/>} />
        <Route path="/article/:id" element={<Article/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
