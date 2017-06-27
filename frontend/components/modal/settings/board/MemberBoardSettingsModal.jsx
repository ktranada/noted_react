import React from 'react';
import PropTypes from 'prop-types';
import Overview from './Overview';
import ConfigurationModal from '../ConfigurationModal';

const TABS = ['Profile'];

class MemberBoardSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.contentComponent = this.contentComponent.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleUsernameChange(data) {
    this.props.editMembership(data);
  }

  handleDeleteButtonClick() {
    this.props.hideModal();
    this.props.history.push('/boards');
    this.props.destroyMembership(this.props.membershipId);
  }

  contentComponent(tab) {
    const { currentBoard, currentUser } = this.props;
    switch (tab) {
      case 'Profile':
        return <Overview
          id={this.props.membershipId}
          value={currentUser.usernamesByBoardId[currentBoard.id]}
          field="username"
          label="USERNAME"
          updateField={this.handleUsernameChange}/>
      default:
        return null;
    }
  }

  render() {
    const leaveBoardButton = (
        <span onClick={this.handleDeleteButtonClick} role="button">Leave Board</span>
      );

    return (
      <ConfigurationModal
        type="board-settings"
        currentBoard={this.props.currentBoard}
        tabs={TABS}
        header={this.props.currentBoard.title}
        contentComponent={this.contentComponent}
        bottomAction={leaveBoardButton} />
    )
  }
}

MemberBoardSettingsModal.propTypes = {
  currentBoard: PropTypes.object.isRequired,
  membershipId: PropTypes.number.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object.isRequired,
    membershipsByBoardId: PropTypes.object.isRequired
  })
}


export default MemberBoardSettingsModal;
