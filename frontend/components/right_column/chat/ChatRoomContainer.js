import { connect } from 'react-redux';

import { getObjectById, asArrayByOrder } from '../../../reducers/selectors';
import { createMessage, addMessage } from '../../../actions/chat_actions';
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

function mapDispatchToProps(dispatch) {
  return ({
    sendMessage: message => dispatch(createMessage(message)),
    addMessage: message => dispatch(addMessage(message))
  })
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom)
