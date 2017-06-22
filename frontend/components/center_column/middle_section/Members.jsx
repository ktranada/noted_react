import React from 'react';
import PropTypes from 'prop-types';

const Members = props => {
  const members = props.members.map(member =>(
    <li key={member.id}>{member.usernamesByBoardId[props.boardId]}</li>
  ));
  return (
    <ul>
      {members}
    </ul>
  )
}

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object
  }))
}

export default Members;
