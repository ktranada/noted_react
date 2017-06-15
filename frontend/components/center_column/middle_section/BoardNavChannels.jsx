import React from 'react';
import { NavLink } from 'react-router-dom';

const BoardNavChannels = (props) => {
  const channels = props.channels.map(channel => (
      <li key={channel.id}>
        <NavLink to={`/boards/${channel.board_id}/messages/${channel.id}`}># {channel.title}</NavLink>
      </li>
    ));
  return (
    <ul className="board-nav__sub-category">
      <li>CHANNELS</li>
      {channels}
    </ul>
  )
}


export default BoardNavChannels;
