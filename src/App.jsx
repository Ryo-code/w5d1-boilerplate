import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

/* * * * * * * ES Version Comparison * * * * * * * * * * * *
//ES5: "var App = React.createClass({render: function(){console.log("hi")} });"...
//ES6: "class App extends React.Component { render(){console.log("hi")} }"...
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

class App extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList/>

        <ChatBar/>
      </div>
    );
  }
}
export default App;
