import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  inviteCount: PropTypes.number.isRequired,
  email: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,

}


const InviteRow = props => {
  const isInitialRow = props.inviteCount === 1;
  const isValid = typeof props.isValid === 'undefined' ? true : props.isValid; // Could be undefined from the beginning

  return (
    <div className="invite__row">
      <label
        data-error={isValid ? "" : "This isn't a valid email address"}
        className={isValid ? "" : "error"}>EMAIL ADDRESS
        <input
          type="email"
          className="invite__input"
          value={props.email}
          onChange={props.handleChange}/>
      </label>

      { !isInitialRow && (
        <i
          onClick={props.handleRemove}
          className="material-icons">&#xE14C;</i>
      )}
    </div>
  )
}

InviteRow.propTypes = propTypes;

export default InviteRow;
