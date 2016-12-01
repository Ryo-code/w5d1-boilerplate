import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

/* * * * * * * ES Version Comparison * * * * * * * * * * * *
//ES5: "var App = React.createClass({render: function(){console.log("hi")} });"...
//ES6: "class App extends React.Component { render(){console.log("hi")} }"...
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class App extends Component {

  constructor(props) {
    super(props); // pass the props to React.Component (i.e. the parent class of this component)
    this.state = { // setup the default state for the app
      currentUser: {
        name: "Bob"
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        }, {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }


  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {
  //       id: 3,
  //       username: "Michelle",
  //       content: "Hello there!"
  //     };
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     console.log("setState activated in App.jsx! :O");
  //   }, 3000);
  // }
  updateMessages = (text) => {
    console.log(text)
    const newMessage = this.state.messages.concat(text)
    this.setState( {messages: newMessage} )
    console.log(text);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messagesForReference={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} messages={this.state.messages}
          submitButton={this.updateMessages}/>
      </div>
    );
  }
}
export default App;
