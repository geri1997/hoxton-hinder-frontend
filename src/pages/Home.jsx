import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";
import "../assets/home.css";
import { fetchUsers } from "../utils/api";
import HomeBtn from "../Components/HomeBtn";

const Home = () => {
  const currentUser = useStore((store) => store.currentUser);
  const animateOnClick = useStore((store) => store.animateButtonOnClick);
  const setAllUsers = useStore((store) => store.setAllUsers);
  const allUsers = useStore((store) => store.allUsers);
  const displayedUserIndex = useStore((store) => store.displayedUserIndex);
  const nextUser = useStore((store) => store.nextUser);
  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, []);
  useEffect(() => {
    fetchUsers(currentUser.interestedIn).then((users) => setAllUsers(users));
  }, [currentUser]);
  const displayedUser = allUsers[displayedUserIndex];
  if (!displayedUser) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="home">
      <h1 className="home-h1">hinder</h1>
      <section className="users">
        <section className="image-container">
          <h2 className="photo-name">
            {allUsers[displayedUserIndex].username}{" "}
            <span className="age"> {displayedUser.age}</span>
          </h2>
          <img src={displayedUser.photo} alt="" />
        </section>
        <section className="users-description">
          <h3>About me</h3>
          <p>{displayedUser.aboutMe}</p>
          <h3>Likes</h3>
          <p>{displayedUser.likes}</p>
          <h3>Dislikes</h3>
          <p>{displayedUser.dislikes}</p>
        </section>
      </section>
      <section className="home-btns">
        <HomeBtn onClick={() => navigate("/profile")}>
          <img
            style={{ height: "28px" }}
            src="/src/assets/images/user.svg"
            alt=""
          />
        </HomeBtn>
        <HomeBtn
          onClick={(e) => {
            animateOnClick("x");
          }}
        >
          <img className="onclick-btn" src="/src/assets/images/x.svg" alt="" />
        </HomeBtn>
        <HomeBtn onClick={() => navigate("/home")}>
          <img src="/src/assets/images/home.svg" alt="" />
        </HomeBtn>
        <HomeBtn
          onClick={(e) => {
            animateOnClick("heart");
            nextUser()
          }}
        >
          <img
            className="onclick-btn"
            src="/src/assets/images/heart.svg"
            alt=""
          />
        </HomeBtn>
        <HomeBtn onClick={() => navigate("/chat")}>
          <img src="/src/assets/images/chat.svg" alt="" />
        </HomeBtn>
      </section>
    </main>
  );
};

export default Home;
