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
    console.log(this.state);
  }

  handleNameChange = (ev) =>　{
    if ( ev.keyCode === 13){
      this.props.updateMessagesFunc({
        type: "postNotification",
        content:　`${currentUser.name} changed their name to ${this.state.username}`
      })
    }
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    this.props.updateMessagesFunc({
      username: this.state.username,
      content: this.state.message,
      type: "postMessage"
    })
    this.setState({message: ""});
  }

  render() {
    const currentUser = this.props.currentUser;  // another way of writing this: const { currentUser } = this.props
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input id="username" type="text" onKeyPress={this.handleNameChange}  onChange={this.onNameChange} placeholder="Your Name (Optional)" value={this.state.username} />

          <input id="new-message" type="text" onChange={this.onMsgChange} placeholder="Type a message and hit ENTER" value={this.state.message}/>

          <input id="submit-button" type="submit"/>
        </form>
      </footer>
    )
  }
}

export default Chatbar
