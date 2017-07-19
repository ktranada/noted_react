import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired
}

const InviteResultErrors = props => {
  return (
    <div className="results__errors">
      <div className="results__header">
        <span>Email</span>
        <span>Reason</span>
      </div>
      <div className="results__body">
        {
          props.errors.map(({email, errors}, idx) => (
            <div key={idx} className="results__row">
              <span>{email}</span>
              <span>{errors.email || errors.invite}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}
InviteResultErrors.propTypes = propTypes;


export default InviteResultErrors;
