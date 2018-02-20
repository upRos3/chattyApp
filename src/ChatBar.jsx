import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    const {currentUser} = this.props;
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
        />
      </footer>
    );
  }
}
export default ChatBar;
