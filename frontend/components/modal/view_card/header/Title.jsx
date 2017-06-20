import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';

const Title = props => {
  const focus = props.isFocused || props.initialFocus ? 'focused' : ''
  const className = `${focus} ${props.isValid ? '' : 'error'}`;
  return (
    <TextareaAutosize
      autoFocus={props.initialFocus}
      onFocus={props.focusTextarea}
      onBlur={props.updateField}
      onChange={props.handleChange}
      value={props.value}
      className={className}/>
  )
}
Title.propTypes = {
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
}


export default Title;
