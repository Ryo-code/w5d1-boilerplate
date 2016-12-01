import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList/>");
    return (
      <div id="message-list">
        {
          this.props.messagesForReference.map((message) => {
            return <Message msg={message} key={message.id}/>;
          })
        }
      </div>
    );
  }
}

export default MessageList;
