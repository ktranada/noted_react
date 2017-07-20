import React from 'react';

import { ActionCable } from './util/ActionCableProvider';

class NotificationsActionCable extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceivedNotifications = this.handleReceivedNotifications.bind(this);
  }

  handleReceivedNotifications(data) {
    const { type, action } = data;
    switch (type) {
      case 'membership': this.handleMembershipUpdates(action, data); break;
    }
  }

  handleMembershipUpdates(action, data) {
    if (action === 'destroy') {
      const { membership } = data;
      const boardId = membership.id;
      this.refs.notificationChannel.removeBoardSubscriptions(boardId)
      this.props.removeBoard(membership);
    }
  }

  render() {
    return(
      <div>
        <ActionCable
          ref="notificationChannel"
          channel={{channel: 'UserNotificationsChannel'}}
          onReceived={this.handleReceivedNotifications}
        />
      </div>
    )
  }
}

export default NotificationsActionCable;
