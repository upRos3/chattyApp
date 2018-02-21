import React, { Component } from "react";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    // this.socket = null;
    this.state = {
      currentUser: "Someone",
      messages: []
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          key: 0,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          key: 1,
          username: "Anonymous",
          content:
            "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    console.log("Websocket Connected!");
  }

  bringMessage = (content, username) => {
    const newMessage = {
      type: "message",
      username: username,
      content: content
    };
    let messages = this.state.messages;
    messages.push(newMessage);
    this.setState({ messages: messages });
  };

  render() {
    console.log("Rendering <App/>");

    const currentUser = this.state.currentUser;
    const messages = this.state.messages;

    return (
      <div>
        <Message messages={messages} />
        <ChatBar bringMessage={this.bringMessage} currentUser={currentUser} />
      </div>
    );
  }
}
export default App;
