import React from 'react';
import { NavLink } from 'react-router-dom';
import BoardNavChannels from './BoardNavChannels';

const BoardContentController = (props) => {
  const { conversations, currentBoard } = props;

  return (
    <ul className="board-nav">
      <li className="board-nav__category"><NavLink to="/lists"><i className="material-icons">&#xE3EC;</i>VIEW BOARD</NavLink></li>
      <li className="board-nav__category"><span><i className="material-icons">&#xE0B7;</i>CHAT</span>
        <BoardNavChannels conversations={conversations} />
      </li>
    </ul>
  )
}

export default BoardContentController;
