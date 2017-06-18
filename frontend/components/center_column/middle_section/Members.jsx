import React from 'react';
import PropTypes from 'prop-types';

const Members = props => {
  const members = props.members.map(member =>(
    <li key={member.id}>{member.username}</li>
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
    username: PropTypes.string.isRequired
  }))
}

export default Members;
