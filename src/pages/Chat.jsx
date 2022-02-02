import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeBtn from "../Components/HomeBtn";
import { useStore } from "../Store/store";
import { fetchConversations } from "../utils/api";
import "../assets/chat.css";

const Chat = () => {
  const currentUser = useStore((store) => store.currentUser);
  const conversations = useStore((store) => store.conversations);
  const setConcersations = useStore((store) => store.setConversations);
  const allUsers = useStore((store) => store.allUsers);

  const navigate = useNavigate();
  useEffect(() => {
    !currentUser && navigate("/");
  }, []);

  useEffect(() => {
    if (currentUser)
      fetchConversations(currentUser.id).then((serverConversations) =>
        setConcersations(serverConversations)
      );
  }, []);

  if (!currentUser) return <h2>Loading...</h2>;

  return (
    <main className="home">
      <h1 className="home-h1">hinder</h1>
      <section className="conversation-users">
        <ul className="convo-user-list">
          {allUsers
            .filter(
              (user) =>
                user.likedPeople.includes(currentUser.id) &&
                currentUser.likedPeople.includes(user.id)
            )
            .reverse()
            .map((user) => (
              <li className="single-user" key={user.id}>
                <img src={user.photo} alt="" />
                <span style={{ fontWeight: "600" }}>{user.username}</span>
              </li>
            ))}
        </ul>
      </section>
      <section className="conversations"></section>
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

export default Chat;
