import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeBtn from "../Components/HomeBtn";
import { useStore } from "../Store/store";
import { fetchConversations } from "../utils/api";
import "../assets/chat.css";

const Chat = () => {
  const currentUser = useStore((store) => store.currentUser);
  const conversations = useStore((store) => store.conversations);
  const setConcersations = useStore((store) => store.setConversations);
  const allUsers = useStore((store) => store.allUsers);

  const matchedUsers = allUsers
    .filter(
      (user) =>
        user.likedPeople.includes(currentUser.id) &&
        currentUser.likedPeople.includes(user.id)
    )
    .reverse();

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
      <section className="conversation-tab">
        <section className="conversation-users">
          <ul className="convo-user-list">
            {matchedUsers.map((user) => (
              <Link key={user.id} to={"/chat/" + user.username}>
                <li className="single-user">
                  <img src={user.photo} alt="" />
                  <span style={{ fontWeight: "600" }}>{user.username}</span>
                </li>
              </Link>
            ))}
          </ul>
        </section>
        <section className="conversations">
          <ul className="conversations-list">
            {conversations.map((conversation) => {
              const matchedUser =
                conversation.userId === currentUser.id
                  ? matchedUsers.find(
                      (user) => user.id === conversation.participantId
                    )
                  : matchedUsers.find(
                      (user) => user.id === conversation.userId
                    );

              return (
                <Link
                  key={'convo' + conversation.id}
                  to={"/chat/" + matchedUser.username}
                >
                  <li className="single-convo">
                    <img src={matchedUser.photo} alt="" />
                    <span style={{ fontWeight: "900", fontSize: "1.5rem" }}>
                      {matchedUser.username}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
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

export default Chat;
