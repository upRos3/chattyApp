import React, { Component } from "react";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous

      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }



  render() {
    console.log("Rendering <App/>");

    const currentUser = this.state.currentUser.name;
    const messages = this.state.messages;

    return (
      <div>
        <Message messages={messages}/>
        <ChatBar currentUser={currentUser}/>
      </div>
    );
  }
}
export default App;
