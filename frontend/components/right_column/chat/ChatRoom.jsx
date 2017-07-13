import React from 'react';
import PropTypes from 'prop-types';
import { ActionCable } from '../../util/ActionCableProvider';

import Messages from './Messages';
import ChatForm from './ChatForm';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.onReceivedMessages = this.onReceivedMessages.bind(this);
    this.loadMessages = this.loadMessages.bind(this);

    this.state = {
      isFetching: false,
      currentPage: 0,
      fetchFailed: false
    }
  }

  onReceivedMessages(message) {
    this.props.addMessage(message);
    if (!window.location.hash.includes(this.props.location.pathname)) {
      this.props.incrementMessageNotifications({
        board_id: this.props.currentBoard.id,
        channel_id: this.props.channel.id
      });
    }
  }

  sendMessage(data) {
    data['channel_id'] = this.props.channel.id
    this.refs.chatChannel.perform('create_message', data)
  }


  loadMessages() {
    if (!this.state.isFetching) {
      this.setState({ isFetching: true, currentPage: this.state.currentPage + 1});

      return this.props.requestMessages(this.state.currentPage + 1).then(
        response => {},
        errors => {}
      ).then(
        () => this.setState({ isFetching: false, fetchFailed: false }),
        () => this.setState({ isFetching: false, fetchFailed: true })
      );
    }
  }

  render() {
    const { channel, messages, members, currentBoard } = this.props;
    if (!channel) return null;
    return (
      <div className="chat-wrapper">
        <ActionCable
          ref={`chatChannel`}
          channel={{channel: 'ChatChannel', room: channel.id}}
          onReceived={this.onReceivedMessages}
        />
        <Messages
          loadMessages={this.loadMessages}
          currentPage={this.state.currentPage}
          isFetching={this.state.isFetching}
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
