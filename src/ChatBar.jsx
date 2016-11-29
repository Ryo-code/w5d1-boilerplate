/** 全く合ってるかどうか分からない ！！ **/

import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    // const {title} = this.props //in ES5: var title = this.props.title
    return (
      // console.log("Rendering <ChatBar/>");
      <footer>
        <input id="username" type="text" placeholder="Your Name (Optional)"/>
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"/>
      </footer>
    )
  }
}

export default Chatbar
