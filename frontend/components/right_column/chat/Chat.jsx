import React from 'react';
import PropTypes from 'prop-types';

import Messages from './Messages';
import ChatForm from './ChatForm';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(data) {
    data['channel_id'] = this.props.channel.id
    return this.props.sendMessage(data);
  }

  render() {
    return (
      <div className="chat-wrapper">
        <Messages
          boardId={this.props.currentBoard.id}
          members={this.props.members}
          messages={this.props.messages}
        />
        <ChatForm sendMessage={this.sendMessage}/>
      </div>
    )
  }
}

export default Chat;
