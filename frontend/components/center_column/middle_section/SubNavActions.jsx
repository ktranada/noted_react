import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Channels from './Channels';
import Members from './Members';

const SubNavActions = (props) => {
  const { channels, members, boardId } = props;
  return (
    <ul className="sub-nav">
      <li className="sub-nav__category"><NavLink className={props.isViewingCard ? 'active' : ''} to={`/boards/${boardId}/lists`}><i aria-hidden className="material-icons">&#xE3EC;</i>VIEW BOARD</NavLink></li>
      <li className="sub-nav__category"><span><i aria-hidden className="material-icons">&#xE0B7;</i>CHAT</span>
        <Channels channels={channels} />
      </li>

      { members.length > 0 &&
        <li className="sub-nav__category members"><span><i aria-hidden className="material-icons">&#xE7FB;</i>MEMBERS</span>
          <Members members={members} />
        </li>
      }
    </ul>
  )
}

SubNavActions.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    board_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired
  })),
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }))
}

export default SubNavActions;
