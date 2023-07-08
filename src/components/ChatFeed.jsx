import React from "react";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import MessageForm from "./MessageForm";
import "../App.css";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages, typing } = props;

  const chat = chats && chats[activeChat];

  const formatAMPM = (date) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const renderReadReceipts = (message, isMyMessage) => {
    const chatPeople = chat.people;
    const currentUserId = props.userName;

    return chatPeople.map((person, index) => {
      const isCurrentUser = person.person.username === currentUserId;
      const showReadReceipt = isMyMessage ? isCurrentUser : !isCurrentUser;

      if (showReadReceipt && person.last_read === message.id) {
        return (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        );
      }

      return null;
    });
  };

  const renderTypingIndicator = () => {
    if (typing) {
      return (
        <div className="typing-indicator">
          {chat.people.map((person) => (
            <div key={person.person.username} className="typing-text">
              {person.person.username} is typing...
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;
      const showReadReceipts =
        lastMessageKey === null ||
        messages[lastMessageKey].sender.username !== message.sender.username;

      const time = new Date(message.created);

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          {showReadReceipts && (
            <div
              className="read-receipts"
              style={{
                marginRight: isMyMessage ? "68px" : "0px",
                marginLeft: isMyMessage ? "0px" : "68px",
              }}
            >
              {renderReadReceipts(message, isMyMessage)}
            </div>
          )}
          <div
            className={`message-time ${
              isMyMessage ? "time-right" : "time-left"
            }`}
          >
            <span>{formatAMPM(time)}</span>
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderTypingIndicator()}
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
