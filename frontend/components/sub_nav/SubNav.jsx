import React from 'react';
import PropTypes from 'prop-types';

import SubNavActionCable from './SubNavActionCable';
import BoardSettings from './top_section/BoardSettings';
import SubNavActions from './middle_section/SubNavActions';
import SubNavDefault from './SubNavDefault';
import AccountSettings from './bottom_section/AccountSettings';

const propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentBoard: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,

  setMessageNotification: PropTypes.func.isRequired,
  updateAppearance: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  incrementMessageNotifications: PropTypes.func.isRequired
}

class SubNav extends React.Component {
  constructor(props) {
    super(props);

    this.setMessageNotification = this.setMessageNotification.bind(this);
  }

  setMessageNotification(notification) {
    return (e) => {
      this.props.setMessageNotification(notification);
    }
  }

  render() {
    if (this.props.isLoading) {
      return <SubNavDefault isLoading={true}/>;
    }

    let inviteButton = null;
    const {
      currentUserId,
      currentBoard,
      appearances,
      members,
      channels,
      subscribedChannels,
    } = this.props;
    if (currentBoard.isLoaded && members.length === 0) {
      inviteButton = (
        <div className="initial-invite-display">
          <button
            type="button"
            onClick={this.props.toggleModal('INVITE_PEOPLE')}
          className="button button-green">
            <i aria-hidden className="material-icons">&#xE7FB;</i>Invite People
          </button>
          <i aria-hidden className="material-icons">&#xE14C;</i>
        </div>
      )
    }

    return (
      <div>
        <SubNavActionCable
          currentUserId={currentUserId}
          currentBoardId={currentBoard.id}
          subscribedChannels={subscribedChannels}
          updateAppearance={this.props.updateAppearance}
          membershipCallbacks={{
            addMember: this.props.addMember,
            updateUsername: this.props.updateUsername,
            removeMember: this.props.removeMember
          }}
          messageCallbacks={{
            incrementMessageNotifications: this.props.incrementMessageNotifications
          }}
        />

        <BoardSettings
          toggleModal={this.props.toggleModal}
          title={currentBoard.title}
          isOwner={currentBoard.owner}
        />
        <hr />
        { inviteButton }
        { inviteButton && <hr />}
        <SubNavActions
          appearances={appearances}
          currentUserId={currentUserId}
          isViewingCard={window.location.hash.includes('card')}
          setMessageNotification={this.setMessageNotification}
          boardId={currentBoard.id}
          members={members}
          channels={channels}
          subscribedChannels={subscribedChannels}/>
      </div>
    )
  }

}

SubNav.propTypes = propTypes;

export default SubNav;
