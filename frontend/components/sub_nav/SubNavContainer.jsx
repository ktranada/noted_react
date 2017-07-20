import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getCurrentBoardById, asArrayByOrder, isLoadingByType } from '../../reducers/selectors';
import { updateAppearance } from '../../actions/sub_nav_actions';
import { addMember, updateUsername, updateBoard, removeMember } from '../../actions/board_actions';
import { setMessageNotification, incrementMessageNotifications } from '../../actions/notification_actions';

import SubNav from './SubNav';

const mapStateToProps = ({ boards, channels, members, loading, subscriptions, appearances }, { currentBoard }) => {
  return ({
    appearances: appearances.usersByBoardId[currentBoard.id],
    subscribedChannels: asArrayByOrder(channels, subscriptions.channelsByBoardId[currentBoard.id]),
    channels: asArrayByOrder(channels, currentBoard.channels),
    members: asArrayByOrder(members, currentBoard.members),
    isLoading: isLoadingByType(loading, 'Board', currentBoard.id, "loadingBoard")
  });
}

const mapDispatchToProps = dispatch => ({
  setMessageNotification: notification => dispatch(setMessageNotification(notification)),

  // WebSockets
  //// Appearance
  updateAppearance: appearance => dispatch(updateAppearance(appearance)),

  //// Membership
  addMember: membership => dispatch(addMember(membership)),
  updateUsername: membership => dispatch(updateUsername(membership)),
  removeMember: membership => dispatch(removeMember(membership)),

  //// Message
  incrementMessageNotifications: notification => dispatch(incrementMessageNotifications(notification)),

  //// Board
  updateBoard: board => dispatch(updateBoard(board))

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubNav);
