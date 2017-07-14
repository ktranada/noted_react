import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../util/Spinner';

const propTypes = {
  disabled: PropTypes.bool.isRequired,
  buttonText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  buttonClass: PropTypes.string,
  buttonColorClass: PropTypes.string,
  style: PropTypes.object
}

const defaultProps = {
  buttonClass: '',
  buttonColorClass: '',
  style: {}
}

function SubmitButton({ disabled, buttonText, buttonColorClass, buttonClass, style }) {
  return (
    <button
       type="submit"
       className={`form__submit-button ${buttonClass} button ${buttonColorClass}`}
       disabled={disabled}
       style={style}>
       {disabled ? <Spinner /> : buttonText}
     </button>
   )
}

SubmitButton.propTypes = propTypes;
SubmitButton.defaultProps = defaultProps;

export default SubmitButton;
