import React from 'react';
import PropTypes from 'prop-types';

import InviteRow from './InviteRow';
import SubmitButton from '../../form_elements/SubmitButton';

const propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  invites: PropTypes.array,
  remainingInviteCount: PropTypes.number.isRequired,
  addInviteRow: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  removeInviteRow: PropTypes.func.isRequired
 }
 
function InviteForm(props) {
  const {
    invites,
    remainingInviteCount,
    addInviteRow,
    handleRemove,
    handleChange,
    handleSubmit,
    removeInviteRow,
    isSubmitting
  } = props;

  const inviteCount = invites.length;
  const canInvite = remainingInviteCount > 0;
  return(
    <form
      onSubmit={handleSubmit}
      className="invite-modal__content">
      <h2>Invite Board Members</h2>
      {
         canInvite &&
         invites.map(({key, email, isValid}, pos) => (
          <InviteRow
            key={key}
            isValid={isValid}
            value={email}
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
        <SubmitButton
          disabled={isSubmitting}
          style={{height: 32}}
          buttonText={<i className="material-icons">&#xE163;</i>}
          buttonColorClass="button-green"
          />
      }

    </form>
  )
}

InviteForm.propTypes = propTypes;

export default InviteForm;
