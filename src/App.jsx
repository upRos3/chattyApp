import React, { Component } from "react";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.websocket = new WebSocket("ws://localhost:3001");

    this.state = {
      loggedInUsers: "",
      currentUser: "Bob",
      messages: []
    };
  }

  componentWillMount() {
    console.log("Messages will be mounted");
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.websocket.onopen = event => {
      console.log("WebSocket connected!");

      //Received from server
      this.websocket.onmessage = event => {
        let returnedMessage = JSON.parse(event.data);
        let messages = this.state.messages;

        switch (returnedMessage.type) {
          case "sumOfUsers":
            this.setState({ loggedInUsers: returnedMessage.content });
            console.log(this.state.loggedInUsers);
            break;

          case "login":
            messages.push(returnedMessage);
            this.setState({ messages: messages });
            break;

          case "message":
            messages.push(returnedMessage);
            this.setState({ messages: messages });
            break;

          case "notification":
            messages.push(returnedMessage);
            this.setState({ messages: messages });
            this.setState({ currentUser: returnedMessage.newUsername });
            break;

          default:
            throw new Error("Unknown event type: " + data.type);
        }
      };
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
    const newNotification = {
      type: "notification",
      newUsername: nameChange,
      content: `${
        this.state.currentUser
      } has changed their name to ${nameChange}`
    };

    //Send to Server
    this.websocket.send(JSON.stringify(newNotification));
  };

  render() {
    const currentUser = this.state.currentUser;
    const messages = this.state.messages;

    return (
      <div>
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
