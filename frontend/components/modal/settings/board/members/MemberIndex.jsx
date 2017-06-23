import React from 'react';
import PropTypes from 'prop-types';
import Member from './Member';

class MemberIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(membershipId) {
    return () => {
      this.props.destroyMembership(membershipId)
    }
  }

  render() {
    const { boardId, currentUserId } = this.props;
    return (
      <div className="board-settings__members">
        {
          this.props.members.map(member => <Member
            key={member.id}
            boardId={this.props.boardId}
            member={member}
            isAdmin={member.id === currentUserId}
            handleClick={this.handleClick} />)
        }
      </div>
    )
  }
}

MemberIndex.propTypes = {
  boardId: PropTypes.number.isRequired,
  currentUserId: PropTypes.number.isRequired,
  currentBoard: PropTypes.object.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object.isRequired,
    membershipsByBoardId: PropTypes.object.isRequired
  })).isRequired,
}

export default MemberIndex;
