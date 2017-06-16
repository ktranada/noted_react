import React from 'react';
import PropTypes from 'prop-types';

const BoardMembers = props => {
  const members = props.members.map(member =>(
    <li key={member.id}>{member.username}</li>
  ));
  return (
    <ul>
      {members}
    </ul>
  )
}

BoardMembers.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    username: PropTypes.string.required
  }))
}

export default BoardMembers;
