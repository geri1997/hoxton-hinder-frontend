import React from "react";
import Button from "../Components/Button";

import '../assets/start.css'
import { useNavigate } from "react-router-dom";

const Start = () => {

  const navigate = useNavigate()
  return (
      <>
     
    <main className="not-logged-in start">
      <h1>hinder</h1>
      <section className="user-enter">
        <Button
          className={"btn user-enter"}
          onClick={e=>navigate('/sign-up')}
        >
          Create Account
        </Button>
        <Button className={"btn user-enter"} onClick={e=>navigate('/login')}>Log In</Button>
      </section>
    </main>
    </>
  );
};

export default Start;
