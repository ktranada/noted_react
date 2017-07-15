import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  boardId: PropTypes.number.isRequired,
  member: PropTypes.shape({
    usernamesByBoardId: PropTypes.object.isRequired
  }),
  userMessages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }).isRequired),
  contentType: PropTypes.string.isRequired
}

function formatContent(input, id) {
  return input.split('<br>').map((item, key) => {
    if (item === '') {
      return <span key={`line-break-${id}`} className="line-break"/>
    }
    return <p key={`message-item-${id}`}>{item}</p>
  });
}

function Message({ boardId, member, userMessages, contentType }) {
  if (!userMessages || userMessages.length === 0) {
    return null;
  }

  const username = member ? member.usernamesByBoardId[boardId] : 'Deactivated User';
  const messageBody = userMessages.map((message, index) => {
    const { id, time, timestamp } = message;
    const content = message[contentType]
    return <div data-time={time} className="user-messages" key={`$message__${id}-${timestamp}`}>{formatContent(content, id)}</div>;
  });

  return (
    <div className="message__container">
      <div className="message__user-icon">
        {username[0].toUpperCase()}
      </div>
      <div className="message__content">
        <div className="message__header"><b>{username}</b>&nbsp; <span>{userMessages[0].time}</span></div>
        <div className="message__body">{messageBody}</div>
      </div>
    </div>
  )
}

Message.propTypes = propTypes;

export default Message;
