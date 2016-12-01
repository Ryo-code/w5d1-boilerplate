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

  onSubmitMsg = (ev) => {
    ev.preventDefault();
    this.props.submitButton({
      username: this.state.username,
      content: this.state.message
    })
    this.setState({message: ""});
  }

  render() {
    const currentUser = this.props.currentUser;  // another way of writing this: const { currentUser } = this.props
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <form onSubmit={this.onSubmitMsg.bind(this)}>
          <input id="username" type="text" placeholder="Your Name (Optional)" value={ currentUser } />
          <input id="new-message" type="text" onChange={this.onMsgChange} placeholder="Type a message and hit ENTER" value={this.state.message}/>
          <input id="submit-button" type="submit"/>
        </form>
      </footer>
    )
  }
}

export default Chatbar
