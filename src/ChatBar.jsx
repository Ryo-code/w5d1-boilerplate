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

  onSubmitBtn = (ev) => {
    ev.preventDefault();
    this.props.submitButton({
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
        <form onSubmit={this.onSubmitBtn.bind(this)}>
          <input id="username" type="text" onChange={this.onNameChange} placeholder="Your Name (Optional)" value={this.state.username} />
          <input id="new-message" type="text" onChange={this.onMsgChange} placeholder="Type a message and hit ENTER" value={this.state.message}/>
          <input id="submit-button" type="submit"/>
        </form>
      </footer>
    )
  }
}

export default Chatbar
