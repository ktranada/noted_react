import React from 'react';
import InviteRow from './InviteRow';
import PropTypes from 'prop-types';
const InviteForm = props => {
  const { invites, remainingInviteCount, addInviteRow, handleRemove,
    handleChange, handleSubmit, removeInviteRow } = props;
  const inviteCount = invites.length;
  const canInvite = remainingInviteCount > 0;
  return(
    <form
      onSubmit={handleSubmit}
      className="invite-modal__content">
      <h2>Invite Board Members</h2>
      {
         canInvite &&
         invites.map(({key, recipient_email, isValid}, pos) => (
          <InviteRow
            key={key}
            isValid={isValid}
            value={recipient_email}
            inviteCount={inviteCount}
            handleRemove={removeInviteRow(key)}
            handleChange={handleChange(pos)}/>
        ))
      }

      {
        canInvite &&
        <div
          role="button"
          className="invite__add"
          onClick={addInviteRow}>
          <i className="material-icons">&#xE148;</i>
          Add Another
        </div>
      }

      {
        !canInvite &&
        <div>
          <b>The limit is 10 members per board.</b>
        </div>
      }

      {
        canInvite &&
        <button type="submit" className="button button-green">
          <i className="material-icons">&#xE163;</i>
        </button>
      }

    </form>
  )
}

InviteForm.propTypes = {
  invites: PropTypes.array,
  remainingInviteCount: PropTypes.number.isRequired,
  addInviteRow: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  removeInviteRow: PropTypes.func.isRequired
 }

export default InviteForm;
