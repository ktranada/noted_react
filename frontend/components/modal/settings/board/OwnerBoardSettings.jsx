import React from 'react';
import PropTypes from 'prop-types';
import Overview from './Overview';
import MemberIndexContainer from './members/MemberIndexContainer';
import InviteIndexContainer from './invites/InviteIndexContainer';
import BoardSettingsModal from '../BoardSettingsModal';

const TABS = ['Profile', 'Overview', 'Members', 'Invites'];

class OwnerBoardSettings extends React.Component {
  constructor(props) {
    super(props);

    this.contentComponent = this.contentComponent.bind(this);
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  handleBoardNameChange(data) {
    this.props.editBoard(data);
  }

  handleUsernameChange(data) {
    this.props.editMembership(data);
  }

  handleDeleteButtonClick() {
    this.props.hideModal();
    this.props.history.push('/boards');
    this.props.destroyBoard();
  }

  contentComponent(tab) {
    const { currentBoard, currentUser } = this.props;
    switch (tab) {
      case 'Profile':
        return <Overview
          id={currentUser.membershipsByBoardId[currentBoard.id]}
          value={currentUser.usernamesByBoardId[currentBoard.id]}
          field="username"
          label="USERNAME"
          updateField={this.handleUsernameChange}/>
      case 'Overview':
        return <Overview
          id={currentBoard.id}
          value={currentBoard.title}
          field="title"
          label="BOARD NAME"
          updateField={this.handleBoardNameChange}/>
      case 'Members':
        return <MemberIndexContainer
          boardId={currentBoard.id}
          currentUserId={currentUser.id}
          currentBoard={currentBoard} />
      case 'Invites':
        return <InviteIndexContainer
          currentBoard={currentBoard} />
      default:
        return null;
    }
  }

  render() {
    const deleteBoardButton = (
        <span onClick={this.handleDeleteButtonClick} role="button">Delete Board</span>
      );

    return (
      <BoardSettingsModal
        currentBoard={this.props.currentBoard}
        tabs={TABS}
        contentComponent={this.contentComponent}
        bottomAction={deleteBoardButton}
        />
    )
  }
}

OwnerBoardSettings.propTypes = {
  currentBoard: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object.isRequired,
    membershipsByBoardId: PropTypes.object.isRequired
  })
}


export default OwnerBoardSettings;
