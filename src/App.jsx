import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

/* * * * * * * ES Version Comparison * * * * * * * * * * * *
//ES5: "var App = React.createClass({render: function(){console.log("hi")} });"
//ES6: "class App extends React.Component { render(){console.log("hi")} }"
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class App extends Component {
  constructor(props) {
    super(props); // pass the props to React.Component (i.e. the parent class of this component)
    this.state = { // setup the default state for the app
      currentUser: {name: "Anonymous"},
      messages: [],
      statement: ""
    };
  }

  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:5000");

    this.ws.onopen = (event) => {
      console.log("Connected to server");
    };

    this.ws.onmessage = (event) => {
      const dataFromServer = JSON.parse(event.data)
      console.log(dataFromServer);

      switch (dataFromServer.type) {
        case "incomingMessage":
          const newMessage = this.state.messages.concat(dataFromServer);
          this.setState({messages: newMessage})
          break;

        case "incomingNotification": //name
          console.log("dataFromServer.content-->", dataFromServer.content);
          this.setState({statement: dataFromServer.content})
          break;
        case "onlineUsers":
          this.setState({onlineUsers: dataFromServer.howMany})
          break;
        default:
          // show an error in the console if the message type is unknown.....
          throw new Error("Unknown event type " + dataFromServer.type);
      }
    }
  }

  changeUsername = (newUser) => {


    let prevUser = this.state.currentUser.name;

    this.setState({currentUser:{name: newUser }})

    //
    // console.log('prev', prevUser, 'next', newUser)
    // if (prevUser != newUser) {
    //   prevUser = newUser;
    //
    // } else {
    //   this.setState({prevUser});
    // }
    const sendNotification = {
      type: "postNotification",
      content: `${prevUser} changed their name to ${newUser}`
    }
    this.ws.send(JSON.stringify(sendNotification));
    this.setState({
      currentUser: {
        name: newUser
      }
    })
  }

  updateMessages = (text) => {
    this.ws.send(JSON.stringify(text));
    console.log("text be here~~~~!", text);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <span> {this.state.onlineUsers} </span>
        </nav>
        <MessageList messagesForReference={this.state.messages}
        changeNameStatement={this.state.statement}/>
        <ChatBar
          currentUser={this.state.currentUser.name}
          messages={this.state.messages}
          updateMessagesFunc={this.updateMessages}
          changeUsername={this.changeUsername}
        />
      </div>
    );
  }
};
export default App;
