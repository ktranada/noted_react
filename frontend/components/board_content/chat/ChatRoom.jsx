import React from 'react';
import PropTypes from 'prop-types';

import { ActionCable } from '../../util/ActionCableProvider';
import Spinner from '../../util/Spinner';
import Messages from './Messages';
import ChatForm from './ChatForm';

const propTypes = {
  currentBoard: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    has_more: PropTypes.bool.isRequired,
  }),
  members: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_id: PropTypes.number.isRequired,
    channel_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    time_offset: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired
  })),
  requestMessages: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired
}

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.onReceivedChat = this.onReceivedChat.bind(this);

    this.state = {
      isFetching: false,
      currentPage: 0,
      fetchFailed: false
    }
  }

  componentDidMount() {
    const { channel, isLoading, requestMessages } = this.props;
    if (channel && !isLoading && !channel.has_loaded_messages) {
      requestMessages(0);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && !nextProps.channel.has_loaded_messages) {
      nextProps.requestMessages(0);
    }
  }

  onReceivedChat({ action, message }) {
    if (action === 'create') {
      this.props.addMessage(message);
    }
  }

  sendMessage(data) {
    data['board_id'] = this.props.currentBoard.id;
    data['channel_id'] = this.props.channel.id;
    this.refs.chatChannel.perform('send_message', { message: data });
  }


  loadMessages() {
    if (!this.state.isFetching && !this.state.fetchFailed) {
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
    if (!channel.has_loaded_messages) {
      return <Spinner />
    }
    return (
      <div className="chat-wrapper">
        <ActionCable
          ref="chatChannel"
          channel={{channel: 'ChatChannel', room: channel.id, board_id: currentBoard.id}}
          onReceived={this.onReceivedChat}
        />
        <Messages
          loadMessages={this.loadMessages}
          currentPage={this.state.currentPage}
          isFetching={this.state.isFetching}
          fetchFailed={this.state.fetchFailed}
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

ChatRoom.propTypes = propTypes;
export default ChatRoom;
