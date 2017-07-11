import { connect } from 'react-redux';

import { getObjectById, asArrayByOrder } from '../../../reducers/selectors';
import { createMessage } from '../../../actions/chat_actions';
import Chat from './Chat';

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
    sendMessage: message => dispatch(createMessage(message))
  })
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
