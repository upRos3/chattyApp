import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message) => {
      return (
        <div key={message.key}>
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
            )
      });



    return (
      <div>
        {messages}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>

    );
  }
}
export default MessageList;
