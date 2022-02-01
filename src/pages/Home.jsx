import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Store/store";
import "../assets/home.css";
import { fetchUsers } from "../utils/api";
import HomeBtn from "../Components/HomeBtn";
import { capitalise } from "../utils/capitalise";

const Home = () => {
  const currentUser = useStore((store) => store.currentUser);
  const animateOnClick = useStore((store) => store.animateButtonOnClick);
  const setAllUsers = useStore((store) => store.setAllUsers);
  const allUsers = useStore((store) => store.allUsers);
  const displayedUserIndex = useStore((store) => store.displayedUserIndex);
  const likeUser = useStore((store) => store.likeUser);
  const dislikeUser = useStore((store) => store.dislikeUser);
  const isMatch = useStore((store) => store.isMatch);
  const toggleIsMatch = useStore((store) => store.toggleIsMatch);
  const nextUser = useStore((store) => store.nextUser);

  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, []);
  useEffect(() => {
    displayedUserIndex === 0 &&
      allUsers.length === 0 &&
      currentUser &&
      fetchUsers(currentUser.interestedIn).then((users) => setAllUsers(users));
  }, [currentUser]);
  const displayedUser = allUsers[displayedUserIndex];
  if (displayedUser === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="home">
      <h1 className="home-h1">hinder</h1>
      {displayedUserIndex <= allUsers.length - 1 ? (
        <section className="users">
          <section className="image-container">
            {isMatch && (
              <div className="match-modal">
                <h2>Its a match</h2>
                <div className="match-btns">
                  <button
                    onClick={(e) => {
                      toggleIsMatch(false);
                      navigate("/chat");
                      nextUser()
                    }}
                    className="btn user-enter match"
                  >
                    Chat
                  </button>
                  <button onClick={(e) => {
                      toggleIsMatch(false);
                      nextUser()
                    }} className="btn user-enter match">
                    Keep Prowling
                  </button>
                </div>
              </div>
            )}
            <h2 className="photo-name">
              {capitalise(allUsers[displayedUserIndex].username)}{" "}
              <span className="age">
                {" "}
                {Math.ceil(displayedUser.age).toString()}
              </span>
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
      ) : (
        <section className="users">
          <section className="image-container">
            <h2 style={{ textAlign: "center" }}>No more users</h2>
            <h2 style={{ textAlign: "center" }}>Check again later</h2>
          </section>
        </section>
      )}
      <section className="home-btns">
        <HomeBtn onClick={() => navigate("/profile")}>
          <img
            style={{ height: "28px" }}
            src="/src/assets/images/user.svg"
            alt=""
          />
        </HomeBtn>
        <HomeBtn
          disabled={displayedUserIndex === allUsers.length||isMatch}
          onClick={(e) => {
            animateOnClick("x");
            dislikeUser(displayedUser.id);
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
            likeUser(displayedUser.id);
          }}
          disabled={displayedUserIndex === allUsers.length||isMatch}
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
