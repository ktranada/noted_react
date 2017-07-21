import React from 'react';
import PropTypes from 'prop-types';
import ConfigurationModal from '../ConfigurationModal';
import AccountOverview from './AccountOverview';
import { OPTIONS_GOTO_TAB } from '../../../../actions/modal_actions';

const TABS = ['Profile'];

const propTypes = {
  updateUser: PropTypes.func.isRequired,
  destroyUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  }),
  options: PropTypes.shape({
    [OPTIONS_GOTO_TAB]: PropTypes.string
  })
}

const defaultProps = {
  options: null
}

class AccountSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.contentComponent = this.contentComponent.bind(this);
    this.handleAccountUpdate = this.handleAccountUpdate.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
  }

  handleAccountUpdate(data, previousTimeZone) {
    return this.props.updateUser(data, previousTimeZone);
  }

  handleDeleteButtonClick() {
    this.props.destroyUser();
  }

  handleLogoutButtonClick() {
    this.props.logout()
  }

  contentComponent(tab) {
    const { currentBoard, currentUser } = this.props;
    switch (tab) {
      case 'Profile':
        return (
          <AccountOverview
            currentUser={currentUser}
            requestTimeZones={this.props.requestTimeZones}
            handleAccountUpdate={this.handleAccountUpdate}
          />
        )
      default:
        return null;
    }
  }

  render() {
    const bottomAction = (
      <div>
        <span onClick={this.handleLogoutButtonClick} role="button">Log Out</span>
        <hr />
        <span onClick={this.handleDeleteButtonClick} role="button">Delete Account</span>
      </div>
      );

    return (
      <ConfigurationModal
        type="account-settings"
        tabs={TABS}
        header="Account"
        contentComponent={this.contentComponent}
        bottomAction={bottomAction}
        />
    )
  }
}

AccountSettingsModal.propTypes = propTypes;
AccountSettingsModal.defaultProps = defaultProps;


export default AccountSettingsModal;
