import React from 'react';
import PropTypes from 'prop-types';

const ConfigurationContent = (props) =>  {
  return (
    <div className="configuration-content">
      <span className="configuration-content__header">{props.header}</span>
      <div className="configuration-content__body">
        {props.children}
      </div>
    </div>
  )
}

ConfigurationContent.propTypes = {
  header: PropTypes.string.isRequired,
}

export default ConfigurationContent;
