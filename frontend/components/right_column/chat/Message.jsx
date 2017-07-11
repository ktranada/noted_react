import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  boardId: PropTypes.number.isRequired,
  member: PropTypes.shape({
    usernamesByBoardId: PropTypes.object.isRequired
  }).isRequired,
  userMessages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_id: PropTypes.number.isRequired,
    channel_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }).isRequired)
}

function Message({ boardId, member, userMessages }) {
  if (!member || !userMessages || userMessages.length === 0) {
    return null;
  }
  const username = member.usernamesByBoardId[boardId];
  const messageBody = userMessages.map(({ id, content }) => <p key={id}>{content}</p>);

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
