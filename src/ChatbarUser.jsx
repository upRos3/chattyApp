import React, { Component } from "react";

class ChatBarUser extends Component {
  // const {currentUser} = this.props;
  onKeyPress = e => {
    if (e.key === "Enter") {
      this.props.handleMessage(e.target.value, this.props.currentUser);
      e.target.value = "";
    }
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="chatbar-username">
        <input
          defaultValue={currentUser}
          className="chatbar-username-input"
          placeholder="Your Name (Optional)"
        />
      </div>
    );
  }
}
export default ChatBarUser;
