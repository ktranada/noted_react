import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

function JoinBoardStep(props) {
  return (
    <label>{props.label}
      <input
        type="text"
        value={props.value}
        onChange={props.handleChange}/>
      {props.children}
    </label>
  )
}


JoinBoardStep.propTypes = propTypes;

export default JoinBoardStep;
