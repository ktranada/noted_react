import React from 'react';
import { ActionCable } from '../util/ActionCableProvider';

class SubNavActionCable extends React.Component {
  constructor(props) {
    super(props);

    this.onReceivedMembership = this.onReceivedMembership.bind(this);
    this.onReceiveMessageCount = this.onReceiveMessageCount.bind(this);
  }

  onReceiveMessageCount(board_id)  {
    const { incrementMessageNotifications } = this.props.messageCallbacks;
    return ({channel_id}) => {
      if (!window.location.hash.includes(`boards/${board_id}/messages/${channel_id}`)) {
        incrementMessageNotifications({
          board_id,
          channel_id
        });
      }
    }
  }

  onReceivedMembership({ action, membership }) {
    const { addMember, updateUsername, removeMember } = this.props.membershipCallbacks;
    if (action === 'create') {
      addMember(membership)
    } else if (action == 'update') {
      updateUsername(membership);
    } else if (action === 'destroy') {
      if (membership.user_id !== this.props.currentUserId) {
        console.log(membership);
        removeMember(membership);
      }
    }
  }


  render() {
    const {
      currentUserId,
      currentBoardId,
      subscribedChannels,
      updateAppearance,
    } = this.props;

    return (
      <div>
        <ActionCable
          channel={{channel: 'AppearanceChannel', board_id: currentBoardId}}
          onReceived={updateAppearance}
        />
        {
          subscribedChannels.map(channel => {
            return (
              <ActionCable
                key={channel.id}
                channel={{channel: 'MessageCountChannel', room: channel.id, board_id: currentBoardId}}
                onReceived={this.onReceiveMessageCount(channel.board_id)}
              />
            )
          })
        }
        <ActionCable
          ref="membershipChannel"
          channel={{channel: 'MembershipChannel', room: currentBoardId, board_id: currentBoardId}}
          onReceived={this.onReceivedMembership}
        />
      </div>
    )
  }
}


export default SubNavActionCable;
