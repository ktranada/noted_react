import React from 'react';
import PropTypes from 'prop-types';


import { ActionCable } from '../../../../util/ActionCableProvider';
import Member from './Member';

const propTypes = {
  boardId: PropTypes.number.isRequired,
  currentUserId: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object.isRequired,
    membershipsByBoardId: PropTypes.object.isRequired
  })).isRequired,
}


class MemberIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(membershipId) {
    return () => {
      this.props.destroyMembership({id: membershipId})
    }
  }

  render() {
    const { boardId, currentUserId, membershipCableRef } = this.props;
    return (
      <div className="board-settings__members">
        <ActionCable
          ref={membershipCableRef}
          channel={{channel: 'MembershipChannel', room: boardId, board_id: boardId}}
        />
        {
          this.props.members.map(member => (
            <Member
              key={member.id}
              boardId={this.props.boardId}
              member={member}
              isAdmin={member.id === currentUserId}
              handleClick={this.handleClick}
            />)
          )
        }
      </div>
    )
  }
}

MemberIndex.propTypes = propTypes;
export default MemberIndex;
