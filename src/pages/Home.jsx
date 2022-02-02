import React, { useEffect, useState } from "react";
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
  const likeUser = useStore((store) => store.likeUser);
  const dislikeUser = useStore((store) => store.dislikeUser);
  const isMatch = useStore((store) => store.isMatch);
  const toggleIsMatch = useStore((store) => store.toggleIsMatch);

  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, []);
  useEffect(() => {
    
      allUsers.length === 0 &&
      currentUser &&
      fetchUsers(currentUser.interestedIn).then((users) => setAllUsers(users));
  }, [currentUser]);

const usersToDisplay=allUsers.filter((user) => {
  if (currentUser.likedPeople.includes(user.id)||currentUser.dislikedPeople.includes(user.id)) {
    return false;
  }
  return true;
})
  const displayedUser = usersToDisplay[0];
  if (allUsers.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="home">
      <h1 className="home-h1">hinder</h1>
      {0 <= usersToDisplay.length - 1 ? (
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
                      likeUser(displayedUser.id)
                      // nextUser();
                    }}
                    className="btn user-enter match"
                  >
                    Chat
                  </button>
                  <button
                    onClick={(e) => {
                      toggleIsMatch(false);
                      likeUser(displayedUser.id);

                      // nextUser();
                    }}
                    className="btn user-enter match"
                  >
                    Keep Prowling
                  </button>
                </div>
              </div>
            )}
            <h2 className="photo-name">
              {capitalise(displayedUser.username)}{" "}
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
          disabled={0 === usersToDisplay.length || isMatch}
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
            

            if (displayedUser.likedPeople.includes(currentUser.id)) {
              toggleIsMatch(true);
            }else{
              likeUser(displayedUser.id);
            }
          }}
          disabled={0 === usersToDisplay.length || isMatch}
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
