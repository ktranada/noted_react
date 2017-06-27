import React from 'react';
import PropTypes from 'prop-types';
import BoardSettings from './top_section/BoardSettings';
import SubNavActions from './middle_section/SubNavActions';
import SubNavDefault from './SubNavDefault';
import AccountInfo from './bottom_section/AccountInfo';

const SubNav = props => {
  if (props.isLoading) {
    return <SubNavDefault isLoading={true}/>;
  }

  let inviteButton = null;
  const { currentBoard, members, channels } = props;
  if (currentBoard.isLoaded && members.length === 0) {
    inviteButton = (
      <div className="initial-invite-display">
        <button
          type="button"
          onClick={props.toggleModal('INVITE_PEOPLE')}
          className="button button-green">
          <i aria-hidden className="material-icons">&#xE7FB;</i>Invite People
        </button>
        <i aria-hidden className="material-icons">&#xE14C;</i>
      </div>
    )
  }

  return (
    <div>
      <BoardSettings
        toggleModal={props.toggleModal}
        board={currentBoard}/>
      <hr />
      { inviteButton }
      { inviteButton && <hr />}
      <SubNavActions
        isViewingCard={props.location.pathname.includes('card')}
        boardId={currentBoard.id}
        members={members}
        channels={channels}/>
    </div>
  )
}

SubNav.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentBoard: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default SubNav;
