import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import BoardNavChannels from './BoardNavChannels';
import BoardMembers from './BoardMembers';

const BoardContentController = (props) => {
  const { channels, members, boardId } = props;
  return (
    <ul className="board-nav">
      <li className="board-nav__category"><NavLink to={`/boards/${boardId}/lists`}><i aria-hidden className="material-icons">&#xE3EC;</i>VIEW BOARD</NavLink></li>
      <li className="board-nav__category"><span><i aria-hidden className="material-icons">&#xE0B7;</i>CHAT</span>
        <BoardNavChannels channels={channels} />
      </li>

      { members.length > 0 &&
        <li className="board-nav__category members"><span><i aria-hidden className="material-icons">&#xE7FB;</i>MEMBERS</span>
          <BoardMembers members={members} />
        </li>
      }
    </ul>
  )
}

BoardContentController.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    board_id: PropTypes.number.required,
    title: PropTypes.string.required,
    permission: PropTypes.string.required
  })),
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    user_id: PropTypes.number.required,
    username: PropTypes.string.required
  }))
}

export default BoardContentController;
