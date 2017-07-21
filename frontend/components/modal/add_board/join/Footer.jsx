import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../../util/Spinner'
const propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

const defaultProps = {
  disabled: false
}

const Footer = (props) => (
  <footer>
    <div onClick={props.handleBackClick}>
      <i aria-hidden className="material-icons">&#xE5C4;</i>
      BACK
    </div>
    <button
      disabled={props.disabled}
      type="button"
      onClick={!props.disabled && props.handleButtonClick}
      className="button button-green"
    >
      {props.disabled ? <Spinner style={{height: "100%"}}/> : props.buttonText}
    </button>
  </footer>
)


Footer.propTypes = propTypes;

export default Footer;
