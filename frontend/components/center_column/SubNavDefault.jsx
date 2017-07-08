import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../util/Spinner';

const SubNavDefault = (props) => (
  <div className="sub-nav-default">
    <span>VIEW BOARD</span>
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

SubNavDefault.proptypes = {
  isLoading: PropTypes.bool.isRequired
}
export default SubNavDefault;
