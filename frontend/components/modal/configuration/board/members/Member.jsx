import React from 'react';
import PropTypes from 'prop-types';

const Member = props => {
  const { boardId, isAdmin, member, handleClick } = props;
  const membershipId = member.membershipsByBoardId[boardId];
  const username = member.usernamesByBoardId[boardId];
  return (
    <div className="board-settings__member">
      <div className="board-settings__member-icon">
        <div data-username={ username[0] }></div>
        <span>{ username }</span>
      </div>
      {
        isAdmin ?
          <p>Admin</p> :
          <button onClick={ handleClick(membershipId) } className="button">Deactivate</button>
      }
    </div>
  )
}

Member.propTypes = {
  boardId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  member: PropTypes.shape({
    usernamesByBoardId: PropTypes.object.isRequired,
    membershipsByBoardId: PropTypes.object.isRequired
  }).isRequired,
  handleClick: PropTypes.func.isRequired
}


export default Member;
