import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HomeBtn from "../Components/HomeBtn";
import { useStore } from "../Store/store";
import { addMessageOnServer, fetchConversationMessages } from "../utils/api";
import "../assets/conversation.css";

const Conversation = () => {
  const currentUser = useStore((store) => store.currentUser);
  const conversations = useStore((store) => store.conversations);
  const allUsers = useStore((store) => store.allUsers);
//   const [currentConversationMessages, setCurrentConversationMessages] = useState([]);
  const currentConversationMessages = useStore(
    (store) => store.currentConversationMessages
  );
  const setCurrentConversationMessages = useStore(
    (store) => store.setCurrentConversationMessages
  );

  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    !currentUser && navigate("/");
  }, []);

  //find the conversation with the current user and the param user
  let currentConversation = null
  currentConversation= conversations.find((convo) => {
    if (
      allUsers.find((user) => {
        return user.username === params.username;
      }).id === convo.userId ||
      allUsers.find((user) => {
        return user.username === params.username;
      }).id === convo.participantId
    ) {
      return true;
    }
    return false;
  });
  console.log(currentConversation)
  let userTalkingTo=null
  if(currentConversation){userTalkingTo = allUsers.find(
    (user) =>
      user.id ===
      (currentConversation.userId === currentUser.id
        ? currentConversation.participantId
        : currentConversation.userId)
  );}
  useEffect(() => {
    //fetch the messages in that conversation
    if (currentUser&&currentConversation)
      fetchConversationMessages(currentConversation.id).then((serverMessages) =>
        setCurrentConversationMessages(serverMessages)
      );
  }, [currentConversation]);

  if (!currentUser) return <h2>Loading...</h2>;

  return (
    <main className="home">
      <h1 className="home-h1">hinder</h1>
      <section className="single-chat">
        {userTalkingTo&&<section className="chat-user-info">
          <button onClick={(e) => navigate("/chat")}>◀</button>
          <img src={userTalkingTo.photo} alt="" />
          <span>{userTalkingTo.username}</span>
        </section>}
        <section className="chat-messages">
          <ul className="list-of-messages">
            {currentConversationMessages.length!==0&&currentConversationMessages.map((message) => (
              <li
                className={
                  message.userId === currentUser.id
                    ? "current-user-message"
                    : ""
                }
                key={message.id}
              >
                {message.messageText}
              </li>
            ))}
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const message = {
                conversationId: currentConversation.id,
                userId: currentUser.id,
                // @ts-ignore
                messageText: e.target.msg.value,
              };
              addMessageOnServer(message)
                .then((resp) => resp.json())
                .then((serverMessage) => {
                  setCurrentConversationMessages([
                    ...currentConversationMessages,
                    serverMessage,
                  ]);
                });
              // @ts-ignore
              e.target.reset();
            }}
          >
            <input name="msg" type="text" />
          </form>
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

export default Conversation;
function animateOnClick(arg0) {
  throw new Error("Function not implemented.");
}

function dislikeUser(id) {
  throw new Error("Function not implemented.");
}

function toggleIsMatch(arg0) {
  throw new Error("Function not implemented.");
}
