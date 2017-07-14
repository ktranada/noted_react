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

function formatContent(input) {
  return input.split('<br>').map((item, key) => {
    if (item === '') {
      return <span key={key} className="line-break"/>
    }
    return <p key={key}>{item}</p>
  });

}

function Message({ boardId, member, userMessages }) {
  if (!member || !userMessages || userMessages.length === 0) {
    return null;
  }

  const username = member.usernamesByBoardId[boardId];
  const messageBody = userMessages.map(({ id, content, time }, index) => {
    return <div data-time={time} className="user-messages" key={`${id}:${time}`}>{formatContent(content)}</div>;
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
