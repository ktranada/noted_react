import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import BoardNavChannels from './BoardNavChannels';
import BoardMembers from './BoardMembers';

const BoardContentController = (props) => {
  const { channels, members } = props;

  return (
    <ul className="board-nav">
      <li className="board-nav__category"><NavLink to="/lists"><i className="material-icons">&#xE3EC;</i>VIEW BOARD</NavLink></li>
      <li className="board-nav__category"><span><i className="material-icons">&#xE0B7;</i>CHAT</span>
        <BoardNavChannels channels={channels} />
      </li>
      <li className="board-nav__category members"><span><i className="material-icons">&#xE7FB;</i>MEMBERS</span>
        <BoardMembers members={members} />
      </li>
    </ul>
  )
}


export default BoardContentController;
