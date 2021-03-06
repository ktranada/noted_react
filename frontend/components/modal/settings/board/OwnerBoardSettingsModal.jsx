import React from 'react';
import PropTypes from 'prop-types';

import Overview from './Overview';
import MemberIndexContainer from './members/MemberIndexContainer';
import InviteIndexContainer from './invites/InviteIndexContainer';
import ConfigurationModal from '../ConfigurationModal';
import { OPTIONS_GOTO_TAB } from '../../../../actions/modal_actions';

const propTypes = {
  currentBoard: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    usernamesByBoardId: PropTypes.object.isRequired,
    membershipsByBoardId: PropTypes.object.isRequired
  }),
  options: PropTypes.shape({
    [OPTIONS_GOTO_TAB]: PropTypes.string
  })
}

const defaultProps = {
  options: null
}

const TABS = ['Profile', 'Overview', 'Members', 'Invites'];

class OwnerBoardSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.contentComponent = this.contentComponent.bind(this);
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.destroyMembership = this.destroyMembership.bind(this);
  }

  handleBoardNameChange(data) {
    return this.props.editBoard(data);
  }

  handleUsernameChange(data) {
    return this.props.editMembership(data);
  }

  destroyMembership(data) {
    data['board_id'] = this.props.currentBoard.id;
    this.membershipCableRef.perform('destroy_membership', data);
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
          currentBoardId={currentBoard.id}
          id={currentUser.membershipsByBoardId[currentBoard.id]}
          value={currentUser.usernamesByBoardId[currentBoard.id]}
          field="username"
          label="USERNAME"
          note="Username can only contain lowercase letters, numbers, and cannot be longer than 16 characters."
          updateField={this.handleUsernameChange}/>
      case 'Overview':
        return <Overview
          id={currentBoard.id}
          value={currentBoard.title}
          field="title"
          label="BOARD NAME"
          updateField={this.handleBoardNameChange}/>
      case 'Members':
        return (
          <MemberIndexContainer
            membershipCableRef={el => this.membershipCableRef = el}
            boardId={currentBoard.id}
            currentUserId={currentUser.id}
            boardMembers={currentBoard.members}
            destroyMembership={this.destroyMembership}
          />
        )
      case 'Invites':
        return <InviteIndexContainer
          currentBoard={currentBoard} />
      default:
        return null;
    }
  }

  render() {
    const { currentBoard, options } = this.props;

    let initialTab = null;
    if (options && options[OPTIONS_GOTO_TAB]) {
      initialTab = TABS.filter(tab => tab === options[OPTIONS_GOTO_TAB])[0];
    }

    const deleteBoardButton = (
        <span onClick={this.handleDeleteButtonClick} role="button">Delete Board</span>
      );

    return (
      <ConfigurationModal
        type="board-settings"
        currentBoard={currentBoard}
        tabs={TABS}
        initialTab={initialTab}
        header={currentBoard.title}
        contentComponent={this.contentComponent}
        bottomAction={deleteBoardButton}
      />
    )
  }
}

OwnerBoardSettingsModal.propTypes = propTypes;
OwnerBoardSettingsModal.defaultProps = defaultProps;
export default OwnerBoardSettingsModal;
