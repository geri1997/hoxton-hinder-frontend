import { useState } from "react";
import {
  Navigate,
  Route,
  Router,
  Routes,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import "./assets/App.css";
import Chat from "./pages/Chat";
import Conversation from "./pages/Conversation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Start from "./pages/Start";

function App() {
  return (
    <Routes>
      <Route index element={<Start />} />
      <Route path={"/sign-up"} element={<SignUp />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/home"} element={<Home />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/chat"} element={<Chat />} />
      <Route path={"/chat/:username"} element={<Conversation/>} />

    </Routes>
  );
}

export default App;
