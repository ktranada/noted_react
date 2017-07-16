import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  toggleModal: PropTypes.func.isRequired
}

function AccountSettings(props) {
  const { email } = props.currentUser;

  return (
    <div className="account-configuration">
      <div className="account-configuration__icon">
        {email[0].toUpperCase()}
      </div>
      <span className="account-configuration__email">{email}</span>
      <i
        role="button"
        className="material-icons"
        onClick={props.toggleModal('ACCOUNT_SETTINGS')}>&#xE8B8;</i>
    </div>
  )
};

AccountSettings.propTypes = propTypes;

export default AccountSettings;
