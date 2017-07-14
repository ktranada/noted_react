import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
}

function Footer(props) {
  return (
    <footer>
      <div onClick={props.handleBackClick}>
        <i aria-hidden className="material-icons">&#xE5C4;</i>BACK
        </div>
      <button type="button" onClick={props.handleButtonClick} className="button button-green">{props.buttonText}</button>
    </footer>
  )
}


Footer.propTypes = propTypes;

export default Footer;
