import React from 'react';
import PropTypes from 'prop-types';
import Invites from './Invites';

class InviteIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleInviteButtonclick = this.handleInviteButtonclick.bind(this);
  }

  handleInviteButtonclick() {
    this.props.toggleInviteMembersModal();
  }

  handleClick(inviteId) {
    return () => {
      this.props.destroyInvite(inviteId)
    }
  }

  render() {
    const pendingInvites = [];
    const acceptedInvites = [];
    this.props.invites.forEach(invite => {
      if (invite.status === 'pending') pendingInvites.push(invite);
      else if (invite.status === 'accepted') acceptedInvites.push(invite);
    });

    const remainingInviteCount = 10 - this.props.boardMemberCount - pendingInvites.length;

    return (
      <div className="board-settings__invites">

        <p>You have {remainingInviteCount} remaining invites.</p>

        {
          remainingInviteCount !== 0 &&
          <button
            onClick={this.handleInviteButtonclick}
            className="button button-green">Invite Members</button> 
        }
        <Invites
          status="pending"
          canRemove={true}
          invites={pendingInvites}
          handleClick={this.handleClick} />

        <Invites
          status="accepted"
          canRemove={false}
          invites={acceptedInvites} />
      </div>
    )
  }
}

InviteIndex.propTypes = {
  invites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  boardMemberCount: PropTypes.number.isRequired
}

export default InviteIndex;
