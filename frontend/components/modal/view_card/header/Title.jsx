import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';

const Title = props => {
  return (
    <TextareaAutosize
      autoFocus={props.initialFocus}
      onFocus={props.focusTextarea}
      onBlur={props.updateField}
      onChange={props.handleChange}
      value={props.value}
      className={props.isFocused || props.initialFocus ? 'focused' : ''}/>
  )
}
Title.propTypes = {
  value: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
}


export default Title;
