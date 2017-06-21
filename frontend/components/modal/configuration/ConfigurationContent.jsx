import React from 'react';
import PropTypes from 'prop-types';

const ConfigurationContent = (props) =>  {
  return (
    <div className="configuration__content">
      <span className="content__header">{props.header}</span>
      <div className="content__body">
        {props.children}
      </div>
    </div>
  )
}

ConfigurationContent.propTypes = {
  header: PropTypes.string.isRequired,
}

export default ConfigurationContent;
