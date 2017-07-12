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
    this.incrementMessageNotifications = this.incrementMessageNotifications.bind(this);
  }

  onReceived(message) {
    this.props.addMessage(message);
    if (!window.location.hash.includes(this.props.location.pathname)) {
      this.incrementMessageNotifications(this.props, this.props.channel.unread_messages + 1)
    }
  }

  sendMessage(data) {
    data['channel_id'] = this.props.channel.id
    this.refs.chatChannel.perform('create_message', data)
  }

  incrementMessageNotifications(props, unreadMessages) {
    this.props.incrementMessageNotifications({
      board_id: props.currentBoard.id,
      channel_id: props.channel.id
    });
  }

  render() {
    const { channel, messages, members, currentBoard } = this.props;
    if (!channel) return null;
    return (
      <div className="chat-wrapper">
        <ActionCable
          ref={`chatChannel`}
          channel={{channel: 'ChatChannel', room: channel.id}}
          onReceived={this.onReceived}
        />
        <Messages
          channel={channel}
          boardId={currentBoard.id}
          members={members}
          messages={messages}
        />
        <ChatForm sendMessage={this.sendMessage}/>
      </div>
    )
  }
}

export default Chat;
