import React, {Component} from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
        <div>
          <Message/>
          <MessageList/>
          <ChatBar/>
        </div>

    );
  }
}
export default App;
