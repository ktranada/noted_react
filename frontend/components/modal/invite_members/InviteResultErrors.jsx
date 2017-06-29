import React from 'react';
import PropTypes from 'prop-types';

const InviteResultErrors = props => (
  <div className="results__errors">
    <div className="results__header">
      <span>Email</span>
      <span>Reason</span>
    </div>
    <div className="results__body">
      {
        props.errors.map(({email, error}, idx) => (
          <div key={idx} className="results__row">
            <span>{email}</span>
            <span>{error}</span>
          </div>
        ))
      }
    </div>
  </div>
)

InviteResultErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default InviteResultErrors;
