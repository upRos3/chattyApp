import React, { Component } from "react";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.websocket = new WebSocket("ws://localhost:3001");

    this.state = {
      currentUser: "Bob",
      messages: []
    };
  }

  componentWillMount() {
    console.log("Messages will be mounted");
    // this.setState({
    //   messages: [
    //     {
    //       key: 0,
    //       username: "Bob",
    //       content: "Has anyone seen my marbles?"
    //     },
    //     {
    //       key: 1,
    //       username: "Anonymous",
    //       content:
    //         "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    //     }
    //   ]
    // });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.websocket.onopen = event => {
      console.log("WebSocket connected!");
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

    //Received from server
    this.websocket.onmessage = event => {
      let returnedMessage = {};
      returnedMessage = JSON.parse(event.data);
      let messages = this.state.messages;
      messages.push(returnedMessage);
      this.setState({ messages: messages });
    };
  };

  handleName = newUsername => {
    const newNotification = {
      type: "notification",
      content: `${
        this.state.currentUser
      } has changed their name to ${newUsername}`
    };

    //Send to Server
    this.websocket.send(JSON.stringify(newNotification));

    //Recieved from server:
    this.websocket.onmessage = event => {
      let returnedMessage = {};
      returnedMessage = JSON.parse(event.data);
      console.log(returnedMessage);
      // let notification = this.state.messages;
      // messages.push(returnedMessage);
      // this.setState({ messages: notification });
    };

    this.setState({ currentUser: newUsername });
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
