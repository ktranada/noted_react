import React from 'react';
import PropTypes from 'prop-types';
import { ActionCable } from '../../util/ActionCableProvider';

import Messages from './Messages';
import ChatForm from './ChatForm';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.onReceived = this.onReceived.bind(this);
  }

  onReceived(message) {
    this.props.addMessage(message);
  }

  sendMessage(data) {
    data['channel_id'] = this.props.channel.id
    return this.props.sendMessage(data);
  }

  render() {
    if (!this.props.channel) return null;
    return (
      <div className="chat-wrapper">
        <ActionCable
          ref="ChatChannel"
          channel={{channel: 'ChatChannel', channel_id: this.props.channel.id}}
          onReceived={this.onReceived}
        />
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
