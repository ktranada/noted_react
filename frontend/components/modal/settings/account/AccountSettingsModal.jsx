import React from 'react';
import PropTypes from 'prop-types';
import ConfigurationModal from '../ConfigurationModal';
import Overview from '../board/Overview';

const TABS = ['Profile'];

class AccountSettingsModal extends React.Component {
  constructor(props) {
    super(props);

    this.contentComponent = this.contentComponent.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleLogoutButtonClick = this.handleLogoutButtonClick.bind(this);
  }

  handleEmailChange(data) {
    return this.props.updateUser(data);
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
        return <Overview
          id={currentUser.id}
          value={currentUser.email}
          field="email"
          label="EMAIL"
          updateField={this.handleEmailChange}/>
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

AccountSettingsModal.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  })
}


export default AccountSettingsModal;
