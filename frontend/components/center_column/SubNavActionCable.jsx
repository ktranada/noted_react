import React from 'react';
import { ActionCable } from '../util/ActionCableProvider';

const onReceiveMessages = currentUserId => (addMessage, incrementMessageNotifications) =>
  response => {
    addMessage(response.message);
    if (!window.location.hash.includes(`/boards/${response.board_id}/messages`)) {
      incrementMessageNotifications({
        board_id: response.board_id,
        channel_id: response.message.channel_id
      });
    }
}

function SubNavActionCable(props) {
  const {
    currentUserId,
    currentBoardId,
    subscribedChannels,
    updateAppearance,
    incrementMessageNotifications,
    addMessage
  } = props;

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
              channel={{channel: 'ChatChannel', room: channel.id}}
              onReceived={onReceiveMessages(currentUserId)(addMessage, incrementMessageNotifications)}
            />
          )
        })
      }
    </div>
  )
}


export default SubNavActionCable;