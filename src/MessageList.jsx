import React, { Component } from "react";

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      switch (message.type) {
        case "message":
          return (
            <div key={message.key}>
              <span className="message-username">{message.username}</span>
              <span className="message-content">{message.content}</span>
            </div>
          );
          break;

        case "notification":
          return (
            <div key={message.key}>
              <span className="message system">{message.content}</span>
            </div>
          );
          break;
      }
    });

    return <div>{messages}</div>;
  }
}
export default MessageList;
