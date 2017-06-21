import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlayContainer from '../../ModalOverlayContainer';
import ConfigurationNav from '../ConfigurationNav';
import ConfigurationContent from '../ConfigurationContent';
import BoardSettingsOverview from './BoardSettingsOverview';

const TABS = ['Overview', 'Members', 'Invites'];
const TAB_CONTENT_COMPONENTS = {
  'Overview': BoardSettingsOverview
}

class BoardSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 'Overview',
      promptDelete: false
    }

    this.handleTabChange = this.handleTabChange.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
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

  deleteBoard() {
    this.props.deleteBoard()
  }

  contentComponent() {
    switch (this.state.currentTab) {
      case 'Overview':
        return <BoardSettingsOverview
          title={this.props.currentBoard.title}
          editBoard={this.props.editBoard}/>
      default:
        return null;
    }
  }

  render() {
    const deleteBoardButton = (
        <span onClick={this.promptDelete} role="button">Delete Board</span>
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
