import React from 'react';
import Spinner from '../util/Spinner';
import PropTypes from 'prop-types';

const SubmitButton = ({ disabled, buttonText, buttonColorClass, buttonClass, style }) => (
  <button
    type="submit"
    className={`form__submit-button ${buttonClass} button ${buttonColorClass}`}
    disabled={disabled}
    style={style}>
    {disabled ? <Spinner /> : buttonText}
  </button>
)

SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  buttonText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  buttonClass: PropTypes.string,
  buttonColorClass: PropTypes.string,
  style: PropTypes.object
}

SubmitButton.defaultProps = {
  buttonClass: '',
  buttonColorClass: '',
  style: {}
}

export default SubmitButton;
