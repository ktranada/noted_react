import React from 'react';
import Spinner from '../misc/Spinner';
import PropTypes from 'prop-types';

const SubmitButton = ({ disabled, buttonText, buttonColorClass, buttonClass }) => (
  <button
    type="submit"
    className={`form__submit-button ${buttonClass} button ${buttonColorClass}`}
    disabled={disabled}>
    {disabled ? <Spinner /> : buttonText}
  </button>
)

SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonClass: PropTypes.string,
  buttonColorClass: PropTypes.string
}

SubmitButton.defaultProps = {
  buttonClass: '',
  buttonColorClass: ''
}

export default SubmitButton;
