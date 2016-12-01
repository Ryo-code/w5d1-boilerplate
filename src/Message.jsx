import React, {Component} from 'react';

class Message extends Component {

  render() {
    let message = this.props.msg;

    return (
      <div className="message" key={"yo"}>
        <span className="username">
          {message.username}
        </span>
        {/* the "message.username" is the same as "this.props.msg.username" */}
        <span className="content">{message.content}</span>
      </div>
    );
  }
}

export default Message;
