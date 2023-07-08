import React from "react";
import "./App.css";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import Modal from "./components/LoginForm";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
console.log(PROJECT_ID);

const App = () => {
  if (!localStorage.getItem("username")) return <Modal />;

  const renderIceBreaker = (chat) => {
    return (
      <div className="icebreaker-message">
        <p>Welcome to the chat! Start a conversation by saying hello.</p>
      </div>
    );
  };

  return (
    <div className="app">
      <ChatEngine
        height="100vh"
        projectID={PROJECT_ID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        onNewMessage={() =>
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play()
        }
        renderIceBreaker={renderIceBreaker}
      />
    </div>
  );
};

export default App;
