import React from 'react';
import PropTypes from 'prop-types';
import ProfileImage from '../../../../misc/ProfileImage';

const InviteRow = ({email, canRemove, handleClick}) => {
  return (
    <div className="board-settings__invite">
      <ProfileImage placeholder={ email[0] } />
      <span>{ email }</span>
      {
        canRemove &&
        <i
          role="button"
          aria-label="remove board invitation"
          className="material-icons"
          onClick={handleClick}>&#xE5CD;</i>
      }
    </div>
  )
}


InviteRow.propTypes = {
  email: PropTypes.string.isRequired,
  canRemove: PropTypes.bool.isRequired,
}

export default InviteRow;
