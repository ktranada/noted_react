import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlayContainer from '../../ModalOverlayContainer';
import ConfigurationNav from '../ConfigurationNav';
import ConfigurationContent from '../ConfigurationContent';
import Overview from './Overview';
import MemberIndexContainer from './members/MemberIndexContainer';
import InviteIndexContainer from './invites/InviteIndexContainer';

const TABS = ['Overview', 'Members', 'Invites'];

class BoardSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'Overview',
      promptDelete: false
    }

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.promptDelete = this.promptDelete.bind(this);
  }

  handleTabChange(tab) {
    return () => {
      if (tab === this.state.currentTab) return;
      this.setState({
        currentTab: tab
      });
    }
  }

  promptDelete(show = true) {
    this.setState({
      promptDelete: show
    })
  }

  handleDeleteButtonClick() {
    this.props.hideModal();
    this.props.history.push('/boards');
    this.props.destroyBoard();
  }

  contentComponent() {
    const { currentUserId, currentBoard } = this.props;
    switch (this.state.currentTab) {
      case 'Overview':
        return <Overview
          title={currentBoard.title}
          editBoard={this.props.editBoard}/>
      case 'Members':
        return <MemberIndexContainer
          boardId={currentBoard.id}
          currentUserId={currentUserId}
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
      <ModalOverlayContainer modalType="configuration">
        <div className="board-settings__container">
          <ConfigurationNav
            tabs={TABS}
            currentTab={this.state.currentTab}
            header={this.props.currentBoard.title}
            handleTabChange={this.handleTabChange}
            bottomAction={deleteBoardButton}/>
          <ConfigurationContent header={this.state.currentTab}>
            { this.contentComponent() }
          </ConfigurationContent>
        </div>
      </ModalOverlayContainer>
    )
  }
}

BoardSettingsModal.propTypes = {
  currentBoard: PropTypes.object.isRequired
}


export default BoardSettingsModal;
