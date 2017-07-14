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
  members: PropTypes.object.isRequired,
  channel: PropTypes.shape({
    has_more: PropTypes.bool.isRequired
  }),
  currentPage: PropTypes.number.isRequired,
  loadMessages: PropTypes.func.isRequired,
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
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight + 15;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isFetching && this.props.messages.length !== prevProps.messages.length) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight + 15;
    }
  }

  handleScroll(e) {
    if (this.props.channel.has_more
        && !this.props.isFetching
        && this.messagesWrapper.scrollTop < 5) {
      const prevScrollHeight= this.messagesWrapper.scrollHeight;
      console.log('prevscrollHeight: ', prevScrollHeight);
      this.props.loadMessages().then(
        () => {
          console.log('currentscrollHeight: ', this.messagesWrapper.scrollHeight);
          this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight - prevScrollHeight;
        }
      );
    }
  }


  render() {

    const { channel, isFetching, fetchFailed, currentPage } = this.props;
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
        style={ channel.has_more ? {} : {marginTop: 0, paddingTop: 25}}
        onScroll={this.handleScroll}
        ref={el => this.messagesWrapper = el }
        className="messages__wrapper"
      >
      {
        isFetching || fetchFailed
        ? (
            <div
              className={`messages__loader fetching ${fetchFailed ? "failed" : ""}`}
            >
              {fetchFailed ? 'Could not fetch messages' : 'Fetching messages...'}
            </div>
          )
        : channel.has_more
          ? <div onClick={this.handleScroll} className="messages__loader">Fetch more</div>
          : null
      }

        {
          !channel.has_more
          && <div className="messages__initial-notice">
              This is the beginning of the message history for {channel.permission === 'public' ? 'the channel' : ''} <b>{channel.title}</b>.
            </div>
        }
        <div className="messages">
          {messages}
        </div>
      </div>
    )
  }

}

Messages.propTypes = propTypes;

export default Messages;
