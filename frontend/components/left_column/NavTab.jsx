import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ActionCable } from '../util/ActionCableProvider';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.number).isRequired,
  setMessageNotification: PropTypes.func.isRequired
}

class NavTab extends React.Component {
  render() {
    const {id, title, isLoaded, channels, hasUnreadMessages, setMessageNotification } = this.props;
    return (
      <li className="navbar__tab">
        {
          channels.map(channel => (
            <ActionCable
              ref={`notificationChannel${channel}`}
              key={`NotificationChannel:${channel}`}
              channel={{channel: 'NotificationChannel', room: channel}}
              onReceived={setMessageNotification(id, channel, isLoaded)}
            />
          ))
        }
        <NavLink data-badge={hasUnreadMessages ? 'unread-messages' : ''} to={`/boards/${id}`}>
          {title[0].toUpperCase()}
        </NavLink>
      </li>
    )
  }
}

NavTab.propTypes = propTypes;

export default NavTab;
