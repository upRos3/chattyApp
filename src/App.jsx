import React, { Component } from "react";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

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
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
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
