import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Channels from './Channels';
import Members from './Members';

const propTypes = {
  appearances: PropTypes.object.isRequired,
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    board_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired
  })),
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object.isRequired
  })),
  currentUserId: PropTypes.number.isRequired
}

const defaultProps = {
  channels: [],
  members: []
}

const isViewingBoard = boardId => {
  return window.location.href.includes(`/boards/${boardId}/lists`);
}
const SubNavActions = (props) => {
  const {
    boardId,
    currentUserId,
    appearances,
    channels,
    subscribedChannels,
    members,
    isViewingCard
  } = props;
  return (
    <ul className="sub-nav__actions">
      <li className="sub-nav__category">
        <NavLink
          to={`/boards/${boardId}/lists`}
        >
          <i aria-hidden className="material-icons">&#xE3EC;</i>VIEW BOARD
        </NavLink>
      </li>
      <li className="sub-nav__category channels"><span><i aria-hidden className="material-icons">&#xE0B7;</i>CHAT</span>
        <Channels
          boardId={boardId}
          setMessageNotification={props.setMessageNotification}
          channels={subscribedChannels} />
      </li>

      { members.length > 0 &&
        <li className="sub-nav__category members"><span><i aria-hidden className="material-icons">&#xE7FB;</i>MEMBERS</span>
          <Members appearances={appearances} boardId={boardId} currentUserId={currentUserId} members={members} />
        </li>
      }
    </ul>
  )
}

SubNavActions.propTypes = propTypes;

export default SubNavActions;
