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
    time: PropTypes.string.isRequired
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

  let count = messages.length;
  let skipCount = 0;

  messages.forEach((message, index) => {
    if (skipCount > 0) {
      skipCount -= 1;
      return;
    }

    if (message === undefined) {
      return;
    }

    const date = message.date
    let nextIndex = index + 1;
    let userMessages = [message]

    while (nextIndex <= count) {
      let nextMessage = messages[nextIndex];
      if (!nextMessage) {
        nextIndex += 1;
        skipCount += 1;
        continue;
      } else if (nextMessage.date !== date || nextMessage.author_id !== message.author_id) {
        break;
      }
      userMessages.push(nextMessage);
      nextIndex += 1;
      skipCount += 1;
    }

    if (result[message.date]) {
      result[message.date].push(userMessages);
    } else {
      result.order.push(message.date);
      result[message.date] = [userMessages];
    }
  });
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
