import React from 'react';
import PropTypes from 'prop-types';

const InlineInput = props => {
  const { type, error, labelClass, inputClass, value,
    handleChange, placeHolder, hasCustomErrors } = props;

  return (
    <label
      data-error={hasCustomErrors ?  "" : error}
      className={`form__inline-input ${Boolean(error) ? "error" : ""} ${labelClass}`}>
      {props.label}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        className={`input-inline ${inputClass} ${props.darkText ? "dark" : ""}`}/>
      { props.children }
    </label>
  )
}

InlineInput.propTypes = {
  type: PropTypes.string,
  hasCustomErrors: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  darkText: PropTypes.bool,
  placeHolder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
}

InlineInput.defaultProps = {
  hasCustomErrors: false,
  error: '',
  label: '',
  labelClass: '',
  inputClass: '',
  placeholder: '',
  darkText: false,
  type: 'text'
}

export default InlineInput;
