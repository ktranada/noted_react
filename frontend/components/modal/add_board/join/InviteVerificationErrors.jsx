import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  error: PropTypes.string.isRequired
}

const errorRow = error => (
  <p className="error">{error}</p>
)

function InviteVerificationError({ error }) {
  if (!error) return null;

  switch(error) {
    case 'revoked':
      return (
        <div>
          {errorRow('It appears that this invite is incorrect/revoked.')}
          {errorRow('Please contact the board admin if you think this is a mistake.')}
        </div>
      );
    case 'responded':
      return errorRow('It looks like this invitation has a response already.');
    default:
      return errorRow(error);
  }
}

InviteVerificationError.propTypes = propTypes;

export default InviteVerificationError;
