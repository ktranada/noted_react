import React from 'react';
import PropTypes from 'prop-types';
import DayMessages from './DayMessages';

const propTypes = {
  boardId: PropTypes.number.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_id: PropTypes.number.isRequired,
    channel_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    time_offset: PropTypes.number.isRequired
  })),
  members: PropTypes.arrayOf(PropTypes.object).isRequired
}

const defaultProps = {
  messages: []
}

function messagesByDate(messages) {
  if (messages.length === 0) return null;

  const result = {
    order: []
  }
  let skipCount = 0;

  for (let i = messages.length - 1, count = messages.length; i >= 0; i--) {
    const message = messages[i];

    if (skipCount > 0) {
      skipCount -= 1;
      continue;
    }

    if (message === undefined) {
      continue;
    }

    const date = message.date
    let nextIndex = i - 1;
    let userMessages = [message]

    while (nextIndex >= 0) {
      let nextMessage = messages[nextIndex];
      if (!nextMessage && nextIndex !== 0) {
        nextIndex -= 1;
        skipCount += 1;
        continue;
      } else if (
        nextMessage.date !== date
        || nextMessage.author_id !== message.author_id
        || nextMessage.time_offset - message.time_offset > 5) {
        break;
      }
      userMessages.push(nextMessage);
      nextIndex -= 1;
      skipCount += 1;
    }

    if (result[message.date]) {
      result[message.date].push(userMessages);
    } else {
      result.order.push(message.date);
      result[message.date] = [userMessages];
    }
  }
  return result
}

class Messages extends React.Component {
  componentDidMount() {
    this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight + 15;
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight + 15;
    }
  }
  render() {
    const data = messagesByDate(this.props.messages);

    const messages = []
    data && data.order.forEach(date => {
      messages.push(
        <DayMessages
          key={date}
          date={date}
          boardId={this.props.boardId}
          dayMessages={data[date]}
          members={this.props.members}
        />
      );
    });

    return (
      <div
        ref={el => this.messagesWrapper = el }
        className="messages__wrapper"
      >
        <div className="messages">
          {messages}
        </div>
      </div>
    )
  }

}

export default Messages;
