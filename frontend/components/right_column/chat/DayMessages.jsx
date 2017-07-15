import React from 'react';
import PropTypes from 'prop-types';

import Divider from '../../util/Divider';
import Message from './Message';

const propTypes = {
  boardId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  dayMessages: PropTypes.arrayOf(PropTypes.array.isRequired),
  members: PropTypes.object.isRequired
}

const defaultProps = {
  messages: []
}

function DayMessages({ boardId, date, dayMessages, members }) {
  if (dayMessages.length === 0) return null;
  const messageRows = dayMessages.map(userMessages => {
    return (
      <Message
        key={`user-messages-${userMessages[0].id}`}
        boardId={boardId}
        member={members[userMessages[0].author_id]}
        userMessages={userMessages}
      />
    )
  });

  return (
    <div className="day-messages__container">
      <Divider>
        {date}
      </Divider>
      {messageRows}
    </div>
  )
}

DayMessages.propTypes = propTypes;
DayMessages.defaultProps = defaultProps;

export default DayMessages;
