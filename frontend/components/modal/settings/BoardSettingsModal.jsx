import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlayContainer from '../ModalOverlayContainer';
import ConfigurationNav from './ConfigurationNav';
import ConfigurationContent from './ConfigurationContent';

class BoardSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: this.props.tabs[0],
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(tab) {
    return () => {
      if (tab === this.state.currentTab) return;
      this.setState({
        currentTab: tab
      });
    }
  }

  render() {
    return (
      <ModalOverlayContainer modalType="configuration">
        <div className="board-settings__container">
          <ConfigurationNav
            tabs={this.props.tabs}
            currentTab={this.state.currentTab}
            header={this.props.currentBoard.title}
            handleTabChange={this.handleTabChange}
            bottomAction={this.props.bottomAction}/>
          <ConfigurationContent header={this.state.currentTab}>
            { this.props.contentComponent(this.state.currentTab) }
          </ConfigurationContent>
        </div>
      </ModalOverlayContainer>
    )
  }
}

BoardSettingsModal.propTypes = {
  currentBoard: PropTypes.object.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentComponent: PropTypes.func.isRequired,
  bottomAction: PropTypes.element.isRequired
}


export default BoardSettingsModal;
