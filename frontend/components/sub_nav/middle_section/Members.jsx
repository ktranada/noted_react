import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object
  })),
  currentUserId: PropTypes.number.isRequired
}

function Members(props) {
  const members = props.members.map(member =>(
    <li key={member.id}>
      <div className={`appearance ${props.appearances[member.id]}`}/>
      {member.usernamesByBoardId[props.boardId]} &nbsp;
      {props.currentUserId === member.id ? "(You)" : ""}
    </li>
  ));
  return (
    <ul>
      {members}
    </ul>
  )
}

Members.propTypes = propTypes;

export default Members;
