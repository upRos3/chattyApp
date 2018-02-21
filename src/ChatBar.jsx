import React, { Component } from "react";

class ChatBar extends Component {
  // const {currentUser} = this.props;
  onKeyPress = e => {
    if (e.key === "Enter") {
      this.props.bringMessage(e.target.value, this.props.currentUser);
      e.target.value = "";
    }
  };

  render() {
    console.log("Rendering <ChatBar/>");
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input
          defaultValue={currentUser}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onKeyPress}
        />
      </footer>
    );
  }
}
export default ChatBar;
