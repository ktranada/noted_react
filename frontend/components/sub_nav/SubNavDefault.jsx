import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../util/Spinner';

const propTypes = {
  isLoading: PropTypes.bool.isRequired
}

const SubNavDefault = props => {
  return (
    <div className="sub-nav-default">
      <span>BOARD</span>
      <div className="sub-nav-default__chat">
        <span>CHAT</span>
        <ul >
          <li>CHANNELS
            <ul>
              <li></li>
              <li></li>
            </ul>
          </li>
          <li>MEMBERS
            <ul>
              <li></li>
              <li></li>
            </ul>
          </li>
        </ul>
        { props.isLoading && <Spinner /> }
      </div>
    </div>
  )
}

SubNavDefault.propTypes = propTypes;

export default SubNavDefault;
