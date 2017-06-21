import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Channels = (props) => {
  const channels = props.channels.map(channel => (
      <li key={channel.id}>
        <NavLink to={`/boards/${channel.board_id}/channel/${channel.id}`}># {channel.title}</NavLink>
      </li>
    ));
  return (
    <ul className="sub-nav__sub-category">
      <li>CHANNELS</li>
      {channels}
    </ul>
  )
}

Channels.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    board_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired
  })),
}

export default Channels;