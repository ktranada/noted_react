import React from 'react';
import PropTypes from 'prop-types';

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
    time_offset: PropTypes.number.isRequired
  })),
  incrementMessageNotifications: PropTypes.func.isRequired,

  location: PropTypes.object.isRequired,
}

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.loadMessages = this.loadMessages.bind(this);

    this.state = {
      isFetching: false,
      currentPage: 0,
      fetchFailed: false
    }
  }

  sendMessage(data) {
    data['board_id'] = this.props.currentBoard.id;
    data['channel_id'] = this.props.channel.id
    this.props.sendMessage(data);
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
    return (
      <div className="chat-wrapper">
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
