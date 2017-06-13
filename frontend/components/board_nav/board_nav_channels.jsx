import React from 'react';
import { NavLink } from 'react-router-dom';

const BoardNavChannels = (props) => {
  const conversations = props.conversations.map(convo => (
      <li key={convo.id}><NavLink to={`/messages/${convo.id}`}># {convo.title}</NavLink></li>
    ));
  return (
    <ul className="board-nav__sub-category">
      <li>CHANNELS</li>
      {conversations}
    </ul>
  )
}


export default BoardNavChannels;
