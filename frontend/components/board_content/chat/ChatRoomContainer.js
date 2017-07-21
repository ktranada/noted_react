import { connect } from 'react-redux';

import { getObjectById, asArrayByOrder, isLoadingByType } from '../../../reducers/selectors';
import { createMessage, addMessage, requestMessages } from '../../../actions/chat_actions';
import { incrementMessageNotifications } from '../../../actions/notification_actions';
import ChatRoom from './ChatRoom';

const mapStateToProps = ({ session, messages, channels, members, loading}, { currentBoard, match: { params: { channelId } } }) => {
  const channel = getObjectById(channelId, channels);
  const boardMembers = {};
  currentBoard.members.forEach(id  => {
    boardMembers[id] = members.byId[id]
  })
  return {
    channel,
    timezone: session.currentUser.timezone,
    messages: channel ? asArrayByOrder(messages, channel.messages) : [],
    members: boardMembers,
    isLoading: channel ? isLoadingByType(loading, 'Channel', channel.id, 'loading_messages') : true,
    isUpdatingTimezone: loading.isUpdatingTimezone
  }
}

const  mapDispatchToProps = (dispatch, { currentBoard, match: { params: { channelId } } }) => ({
  requestMessages: page => dispatch(requestMessages(currentBoard.id, channelId, page)),

  // Chat Websocket
  addMessage: message => dispatch(addMessage(message))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom)
