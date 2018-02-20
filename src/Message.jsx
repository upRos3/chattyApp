import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {
  render() {
    const {messages} = this.props;
    return (
      <div className="message">
        <MessageList messages={messages} />
      </div>
    );
  }
}
export default Message;
