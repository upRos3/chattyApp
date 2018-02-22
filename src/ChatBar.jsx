import React, { Component } from "react";

class ChatBar extends Component {
  // const {currentUser} = this.props;
  messageSubmit = e => {
    if (e.key === "Enter") {
      this.props.handleMessage(e.target.value, this.props.currentUser);
      e.target.value = "";
    }
  };

  nameChange = e => {
    if (e.key === "Enter") {
      this.props.handleName(e.target.value);
      e.target.value = "";
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <footer className="chatbar">
        <input
          onKeyPress={this.nameChange}
          defaultValue={currentUser}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.messageSubmit}
        />
      </footer>
    );
  }
}
export default ChatBar;
