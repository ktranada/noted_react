import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ActionCable } from '../util/ActionCableProvider';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.number).isRequired,
}

const isTabActive = id => (match, location) => {
  return location.pathname.includes(`/boards/${id}`);
}

class NavTab extends React.Component {
  render() {
    const {id, title, isLoaded, channels, hasUnreadMessages } = this.props;
    return (
      <li className="navbar__tab">
        <NavLink
          data-badge={hasUnreadMessages ? 'unread-messages' : ''} to={`/boards/${id}`}
          isActive={isTabActive(id)}
        >
          {title[0].toUpperCase()}
        </NavLink>
      </li>
    )
  }
}

NavTab.propTypes = propTypes;

export default NavTab;
