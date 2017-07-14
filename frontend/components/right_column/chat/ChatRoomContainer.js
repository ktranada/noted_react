import { connect } from 'react-redux';

import { getObjectById, asArrayByOrder } from '../../../reducers/selectors';
import { createMessage, addMessage, requestMessages } from '../../../actions/chat_actions';
import { incrementMessageNotifications } from '../../../actions/notification_actions';
import ChatRoom from './ChatRoom';

function mapStateToProps({ messages, channels, members}, { currentBoard, match: { params: { channelId } } }) {
  const channel = getObjectById(channelId, channels);
  const boardMembers = {};
  currentBoard.members.forEach(id  => {
    boardMembers[id] = members.byId[id]
  })
  return {
    channel,
    messages: channel ? asArrayByOrder(messages, channel.messages) : [],
    members: boardMembers
  }
}

const  mapDispatchToProps = (dispatch, { match: { params: { channelId } } }) => {
  return ({
    sendMessage: message => dispatch(createMessage(message)),
    addMessage: message => dispatch(addMessage(message)),
    incrementMessageNotifications: notification => dispatch(incrementMessageNotifications(notification)),
    requestMessages: page => dispatch(requestMessages(channelId, page))
  })
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom)
