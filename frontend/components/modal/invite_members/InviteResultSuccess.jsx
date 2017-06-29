import React from 'react';
import PropTypes from 'prop-types';

const InviteResultSuccess = props => (
  <div className="results__success">
    <div className="results__header">
      <span>Email</span>
    </div>
    <div className="results__body">
      {
        props.success.map(({email}, idx) => (
          <div key={idx} className="results__row">
            <span>{email}</span>
          </div>
        ))
      }
    </div>
  </div>
)

InviteResultSuccess.propTypes = {
  success: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default InviteResultSuccess;
