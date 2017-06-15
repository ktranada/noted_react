import React from 'react';

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

export default BoardMembers;
