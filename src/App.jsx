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
      currentUser: {
        name: "Anonymous"
      },
      messages: []
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
          // handle incoming notification...........
          break;

        default:
          // show an error in the console if the message type is unknown.....
          throw new Error("Unknown event type " + dataFromServer.type);

      }
    }
  }

    updateMessages = (text) => {
      this.ws.send(JSON.stringify(text));
    }

    render() {
      console.log("Rendering <App/>");
      return (
        <div className="wrapper">
          <nav>
            <h1>Chatty</h1>
          </nav>
          <MessageList messagesForReference={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser.name} messages={this.state.messages} updateMessagesFunc={this.updateMessages}/>
        </div>
      );
    }
};
  export default App;
