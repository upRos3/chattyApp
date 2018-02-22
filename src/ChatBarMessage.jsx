import React, { Component } from "react";

class ChatBarMessage extends Component {
  onKeyPress = e => {
    if (e.key === "Enter") {
      this.props.handleMessage(e.target.value, this.props.currentUser);
      e.target.value = "";
    }
  };

  render() {
    return (
      <div className="chatbar-message">
        <input
          className="chatbar-message-input"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onKeyPress}
        />
      </div>
    );
  }
}

export default ChatBarMessage;
