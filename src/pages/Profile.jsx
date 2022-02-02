import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeBtn from "../Components/HomeBtn";
import { useStore } from "../Store/store";
import "../assets/profile.css";
import { updateUser } from "../utils/api";

const Profile = () => {
  const currentUser = useStore((store) => store.currentUser);
  const updateUserOnState = useStore((store) => store.updateUserOnState);
  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, []);

  if(!currentUser)return <h2>Loading...</h2>

  return (
    <main className="home">
      <input
        hidden
        onChange={(e) => {
          // @ts-ignore
          const file = document.querySelector("input[type=file]").files[0];
          const reader = new FileReader();

          reader.addEventListener(
            "load",
            function () {
              // convert image file to base64 string
              let userCopy = JSON.parse(JSON.stringify(currentUser));
              userCopy.photo = reader.result;
              console.log(userCopy)
              updateUser(userCopy);
              updateUserOnState(userCopy);
            },
            false
          );

          if (file) {
            reader.readAsDataURL(file);
          }
        }}
        style={{ position: "absolute" }}
        type="file"
        name="avatar"
        id="avatar"
      />
      <h1 className="home-h1">hinder</h1>
      <section className="profile-info">
        <section className="profile-photo">
          <img
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              // @ts-ignore
              document.querySelector("input#avatar").click();
            }}
            src={currentUser.photo}
            alt=""
          />
          <h2>{currentUser.username}</h2>
        </section>
        <section className="users-description">
          <h3>About me</h3>
          <p>{currentUser.aboutMe}</p>
          <h3>Likes</h3>
          <p>{currentUser.likes}</p>
          <h3>Dislikes</h3>
          <p>{currentUser.dislikes}</p>
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

        <HomeBtn onClick={() => navigate("/home")}>
          <img src="/src/assets/images/home.svg" alt="" />
        </HomeBtn>

        <HomeBtn onClick={() => navigate("/chat")}>
          <img src="/src/assets/images/chat.svg" alt="" />
        </HomeBtn>
      </section>
    </main>
  );
};

export default Profile;
