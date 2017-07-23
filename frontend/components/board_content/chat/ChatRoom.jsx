import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

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
      fetchFailed: false
    }
    this.chatChannelCable = null;
    this.bindActionCable = this.bindActionCable.bind(this)
  }

  componentDidMount() {
    const { channel, isLoading, requestMessages } = this.props;
    if (channel && !isLoading && !channel.has_loaded_messages) {
      requestMessages(null);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && !nextProps.channel.has_loaded_messages) {
      nextProps.requestMessages(null);
    }
  }

  onReceivedChat({ action, message }) {
    if (action === 'create') {
      const { created_at } = message;
      const localTimezone = moment.tz(created_at, this.props.timezone);
      message['date'] = localTimezone.format('MMMM Do');
      message['time'] = localTimezone.format('h:mm A');
      this.props.addMessage(message);
    }
  }

  bindActionCable(el) {
    this.chatChannelCable = el;
  }

  sendMessage(data) {
    data['board_id'] = this.props.currentBoard.id;
    data['channel_id'] = this.props.channel.id;
    this.chatChannelCable && this.chatChannelCable.perform('create_message', { message: data });
  }


  loadMessages() {
    if (!this.state.isFetching && !this.state.fetchFailed) {
      this.setState({ isFetching: true});

      return this.props.requestMessages(this.props.channel.latest).then(
        response => {},
        errors => {}
      ).then(
        () => this.setState({ isFetching: false, fetchFailed: false }),
        () => this.setState({ isFetching: false, fetchFailed: true })
      );
    }
  }

  render() {
    const { channel, messages, members, currentBoard, timezone } = this.props;
    if (!channel) return null;
    if (!channel.has_loaded_messages) {
      return <Spinner />
    }
    return (
      <div className="chat-wrapper">
        <ActionCable
          ref={this.bindActionCable}
          shouldUnsubscribe={this.props.isUpdatingTimezone}
          channel={{channel: 'ChatChannel', room: channel.id, board_id: currentBoard.id}}
          onReceived={this.onReceivedChat}
          trackedProps={{timezone}}
        />

        <Messages
          loadMessages={this.loadMessages}
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
