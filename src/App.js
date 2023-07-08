/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "./App.css";
import { ChatEngine } from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import Modal from "./components/LoginForm";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
console.log(PROJECT_ID);

const App = () => {
  const [userInteracted, setUserInteracted] = useState(false);

  const handleInteraction = () => {
    setUserInteracted(true);
  };

  if (!localStorage.getItem("username")) return <Modal />;

  useEffect(() => {
    if (userInteracted) {
      const audio = new Audio(
        "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
      );
      audio.play();
    }
  }, [userInteracted]);

  return (
    <div className="app" onClick={handleInteraction}>
      <ChatEngine
        height="100vh"
        projectID={PROJECT_ID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      />
    </div>
  );
};

export default App;
