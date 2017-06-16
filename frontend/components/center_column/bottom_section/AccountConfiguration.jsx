import React from 'react';

const AccountConfiguration = (props) => {
  const { email } = props.currentUser;

  return (
    <div className="account-configuration">
      <div className="account-configuration__icon">
        {email[0].toUpperCase()}
      </div>
      <span className="account-configuration__email">{email}</span>
      <i role="button" className="material-icons">&#xE8B8;</i>
    </div>
  )
};

export default AccountConfiguration;
