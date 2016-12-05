import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      message: ""
    }
  }

  onMsgChange = (ev) => {
    this.setState( {message: ev.target.value} );
    console.log(this.state);
  }

  onNameChange = (ev) => {
    this.setState( {username: ev.target.value} );

    if ( ev.key === 'Enter' ){
      this.props.changeUsername(ev.target.value);
    }
  }

  onSubmit = (ev) => {
    if ( ev.keyCode === 13) {
      this.props.updateMessagesFunc({
        username: this.state.username,
        content: this.state.message,
        type: "postMessage"})
        this.props.changeUsername(this.state.username)
      this.setState({message: ""});
    }
  }

  render() {
    const currentUser = this.props.currentUser;  // another way of writing this: const { currentUser } = this.props
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <input id="username" type="text" onChange={this.onNameChange} onKeyPress={this.onNameChange} placeholder="Your Name (Optional)" value={this.state.username} />

        <input id="new-message" type="text"
          onChange={this.onMsgChange}
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.onSubmit}
          value={this.state.message}
        />

      </footer>
    )
  }
}

export default Chatbar
