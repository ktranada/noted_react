import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.element
}


function ConfigurationContent(props) {
  return (
    <div className="configuration-content">
      <span className="configuration-content__header">{props.header}</span>
      <div className="configuration-content__body">
        {props.children}
      </div>
    </div>
  )
}

ConfigurationContent.propTypes = propTypes;
export default ConfigurationContent;
