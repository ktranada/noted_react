import React from 'react';
import PropTypes from 'prop-types';

import ModalOverlayContainer from '../ModalOverlayContainer';
import ConfigurationNav from './ConfigurationNav';
import ConfigurationContent from './ConfigurationContent';

const propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  contentComponent: PropTypes.func.isRequired,
  bottomAction: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  initialTab: PropTypes.string
}

const defaultProps = {
  initialTab: null
}

class ConfigurationModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: this.props.initialTab || this.props.tabs[0],
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
        <div className={`${this.props.type}__container`}>
          <ConfigurationNav
            tabs={this.props.tabs}
            currentTab={this.state.currentTab}
            header={this.props.header}
            handleTabChange={this.handleTabChange}
            bottomAction={this.props.bottomAction}/>
          <ConfigurationContent header={this.state.currentTab}>
            {this.props.children}
            {this.props.contentComponent(this.state.currentTab)}
          </ConfigurationContent>
        </div>
      </ModalOverlayContainer>
    )
  }
}

ConfigurationModal.propTypes = propTypes;
ConfigurationModal.defaultProps = defaultProps;
export default ConfigurationModal;
