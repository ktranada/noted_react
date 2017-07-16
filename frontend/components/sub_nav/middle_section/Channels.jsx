import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    board_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired
  })),
}

function Channels(props) {
  const channels = props.channels.map(channel => (
      <li
        data-unread-count={channel.unread_messages}
        data-has-unread={channel.unread_messages > 0}
        key={channel.id}
      >
        <NavLink
          onClick={props.setMessageNotification({channel_id: channel.id, board_id: channel.board_id, unread_messages: 0})}
          to={`/boards/${channel.board_id}/messages/${channel.id}`}
        >
        # {channel.title}
        </NavLink>
      </li>
    ));
  return (
    <ul className="sub-nav__sub-category">
      <li>CHANNELS</li>
      {channels}
    </ul>
  )
}

Channels.propTypes = propTypes;

export default Channels;
