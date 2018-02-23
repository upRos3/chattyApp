import React, { Component } from "react";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";
import NavBar from "./NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.websocket = new WebSocket("ws://localhost:3001");

    this.state = {
      loggedInUsers: "",
      currentUser: "Anonymous",
      messages: []
    };
  }

  componentDidMount() {
    //Received from websocket server
    this.websocket.onmessage = event => {
      let returnedMessage = JSON.parse(event.data);
      let messages = this.state.messages;

      switch (returnedMessage.type) {
        case "sumOfUsers":
          this.setState({ loggedInUsers: returnedMessage.content });
          break;

        case "message":
          messages.push(returnedMessage);
          this.setState({ messages: messages });
          break;

        case "nameChange":
          this.setState({ currentUser: returnedMessage.newUsername });
          break;

        case "notification":
          messages.push(returnedMessage);
          this.setState({ messages: messages });
          break;

        default:
          throw new Error("Unknown event type: " + data.type);
      }
    };
  }

  handleMessage = content => {
    const newMessage = {
      type: "message",
      username: this.state.currentUser,
      content: content
    };

    //Send to server
    this.websocket.send(JSON.stringify(newMessage));
  };

  handleName = nameChange => {
    //Send to server
    const sendData = data => {
      return this.websocket.send(JSON.stringify(data));
    };

    let messages = this.state.messages;

    if (this.state.currentUser === nameChange) {
      const sameName = {
        type: "alert",
        username: this.state.currentUser,
        content: `${this.state.currentUser} is already your name!`
      };

      sendData(sameName);
    } else {
      const newName = {
        type: "notification",
        newUsername: nameChange,
        content: `${
          this.state.currentUser
        } has changed their name to ${nameChange}`
      };

      sendData(newName);
    }
  };

  render() {
    const messages = this.state.messages;
    const loggedInUsers = this.state.loggedInUsers;

    return (
      <div>
        <NavBar loggedInUsers={loggedInUsers} />
        <Message messages={messages} />
        <ChatBar
          handleMessage={this.handleMessage}
          handleName={this.handleName}
        />
      </div>
    );
  }
}

export default App;
