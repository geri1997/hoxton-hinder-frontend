import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";

const Chat = () => {
  const currentUser = useStore((store) => store.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, []);
  return (
    <main className="home">
      <h1 className="home-h1">hinder</h1>
      <section className="users">
        <section className="image-container">
          <h2 className="photo-name">
            John <span className="age"> 25</span>
          </h2>
          <img src="/src/assets/images/john1.jpg" alt="" />
        </section>
        <section className="users-description">
          <h3>About me</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt,
            sint. Fuga mollitia incidunt sint, nobis saepe esse rerum nam
            repudiandae ea, nisi fugit rem. Et voluptates hic culpa quidem nemo.
          </p>
          <h3>Likes</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            amet!
          </p>
          <h3>Dislikes</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            officiis.
          </p>
        </section>
      </section>
      <section className="home-btns">
        <button onClick={() => navigate("/profile")} className="hinder-btns">
          <img
            style={{ height: "28px" }}
            src="/src/assets/images/user.svg"
            alt=""
          />
        </button>

        <button onClick={() => navigate("/home")} className="hinder-btns">
          {" "}
          <img src="/src/assets/images/home.svg" alt="" />
        </button>

        <button onClick={() => navigate("/chat")} className="hinder-btns">
          {" "}
          <img src="/src/assets/images/chat.svg" alt="" />
        </button>
      </section>
    </main>
  );
};

export default Chat;
