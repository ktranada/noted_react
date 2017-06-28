import React from 'react';
import PropTypes from 'prop-types';

const InputInline = props => {
  const { type, error, labelClass, inputClass,
    value, handleChange, placeHolder } = props;
  return (
    <label
      data-error={error}
      className={`${Boolean(error) ? "error" : ""} ${labelClass}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        className={`input-inline ${inputClass}`}/>
    </label>
  )
}

InputInline.propTypes = {
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
}

InputInline.defaultProps = {
  error: '',
  labelClass: '',
  inputClass: '',
  placeholder: ''
}

export default InputInline;
