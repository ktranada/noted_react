import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asArrayByOrder, getCurrentBoardById } from '../../reducers/selectors';
import { requestSubscriptions, requestBoard } from '../../actions/nav_actions';
import { addMember, updateUsername, removeMember } from '../../actions/board_actions';
import { incrementMessageNotifications } from '../../actions/notification_actions';
import Nav from './Nav';

const mapStateToProps = ({ boards, subscriptions, channels }, { currentBoardId, isLanding }) => {
  const currentBoard = getCurrentBoardById(currentBoardId, boards);
  const boardsArray = asArrayByOrder(boards, boards.order)
    .map(({ id, isLoaded, hasUnreadMessages, title }) => {
      const subscribedChannels = subscriptions.channelsByBoardId[id] || []
      // const hasUnreadMessages = subscribedChannels.find(id => channels.byId[id] && channels.byId[id].unread_messages > 0) !== undefined;
      return { id, isLoaded, title, hasUnreadMessages, channels: subscribedChannels }
    });

  return ({
    boards: boardsArray,
    boardIsLoaded: isLanding ? true : currentBoard.isLoaded,
    boardIsLoading: isLanding ? false : currentBoard.isLoading
  })
};

const mapDispatchToProps = dispatch => ({
  requestBoard: (boardId, isTimeZoneUpdate) => dispatch(requestBoard(boardId, isTimeZoneUpdate)),
  incrementMessageNotifications: notification => dispatch(incrementMessageNotifications(notification)),
  requestSubscriptions: () => dispatch(requestSubscriptions()),
  addMember: membership => dispatch(addMember(membership)),
  removeMember: membership => dispatch(removeMember(membership)),
  updateUsername: membership => dispatch(updateUsername(membership)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
