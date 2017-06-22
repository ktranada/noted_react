import React from 'react';
import PropTypes from 'prop-types';
import InviteRow from './InviteRow';

const Invites = ({ status, canRemove, invites, handleClick }) => {
  if (!invites.length) return null;
  return (
    <div className={`board-settings__invites-${status}`}>
      <h4>{ status } invitations</h4>
      {
        invites.map(({id, recipient_email}) => <InviteRow
          key={id}
          email={recipient_email}
          canRemove={canRemove}
          handleClick={canRemove ? handleClick(id) : null} />)
      }
    </div>
  )
}

Invites.propTypes = {
  status: PropTypes.string.isRequired,
  canRemove: PropTypes.bool.isRequired,
  invites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    recipient_email: PropTypes.string.isRequired
  })).isRequired,
  handleClick: PropTypes.func
}

export default Invites;
