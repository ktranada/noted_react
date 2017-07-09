import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
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

const defaultProps = {
  hasCustomErrors: false,
  error: '',
  label: '',
  labelClass: '',
  inputClass: '',
  placeholder: '',
  darkText: false,
  type: 'text'
}

function InlineInput(props) {
  return (
    <label
      data-error={props.hasCustomErrors ?  "" : props.error}
      className={`form__inline-input ${Boolean(props.error) ? "error" : ""} ${props.labelClass}`}>
      {props.label}
      <input
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeHolder}
        className={`input-inline ${props.inputClass} ${props.darkText ? "dark" : ""}`}/>
      { props.children }
    </label>
  )
}

InlineInput.propTypes = propTypes;
InlineInput.defaultProps = defaultProps;

export default InlineInput;
