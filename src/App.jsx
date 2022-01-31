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
      <Route
      path={"/login"}
      element={<Login/>}
    />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/chat"} element={<Chat />} />


      {/* <Route
      path={"/login"}
      element={<Login setUsers={setUsers} setSelectedUser={setSelectedUser} users={users} />}
    />
    <Route path={"/logged-in"} element={<MainApp setSelectedUser={setSelectedUser} user={selectedUser} users={users}/>} />
    <Route path={"/logged-in/:id"} element={<MainApp setSelectedUser={setSelectedUser} user={selectedUser} users={users}/>} /> */}
    </Routes>
  );
}

export default App;
