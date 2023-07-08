/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "./App.css";
import {
  ChatEngine,
  ChatSettings,
  getChats,
  ChatList,
} from "react-chat-engine";
import ChatFeed from "./components/ChatFeed";
import Modal from "./components/LoginForm";
import { CaretDownFilled, LogoutOutlined } from "@ant-design/icons";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
console.log(PROJECT_ID);

const App = () => {
  const [userInteracted, setUserInteracted] = useState(false);
  const [chats, setChats] = useState(null);

  const handleInteraction = () => {
    setUserInteracted(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.reload();
  };

  const renderSettingsTopBar = () => (
    <div className="chat-settings-top-bar">
      <ChatSettings />
      <button className="logout-button" onClick={handleLogout}>
        <LogoutOutlined style={{ paddingRight: "10px" }} /> Logout
      </button>
    </div>
  );

  const renderScrollDownBar = () => {
    return (
      <div className="scroll-down-bar">
        <CaretDownFilled /> Scroll Down
      </div>
    );
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

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats(PROJECT_ID, {
          userName: localStorage.getItem("username"),
          userSecret: localStorage.getItem("password"),
        });
        setChats(response.chats);
      } catch (error) {
        console.log("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="app" onClick={handleInteraction}>
      <ChatEngine
        height="100vh"
        projectID={PROJECT_ID}
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        renderChatList={(chatAppState) => (
          <ChatList {...chatAppState} chats={chats} />
        )}
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        renderChatSettings={renderSettingsTopBar}
        renderScrollDownBar={renderScrollDownBar}
      />
    </div>
  );
};

export default App;
