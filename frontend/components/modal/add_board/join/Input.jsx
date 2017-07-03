import React from 'react';
import PropTypes from 'prop-types';

const JoinBoardStep = props => (
  <label>{props.label}
    <input
      type="text"
      value={props.value}
      onChange={props.handleChange}/>
    {props.children}
  </label>
)

JoinBoardStep.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default JoinBoardStep;
