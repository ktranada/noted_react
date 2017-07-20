import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asArrayByOrder, getCurrentBoardById, isLoadingByType } from '../../reducers/selectors';
import { requestBoard } from '../../actions/nav_actions';
import { removeBoard } from '../../actions/board_actions';
import { incrementMessageNotifications } from '../../actions/notification_actions';
import Nav from './Nav';

const mapStateToProps = ({ boards, subscriptions, channels, loading}, { currentBoardId, isLanding }) => {
  const currentBoard = getCurrentBoardById(currentBoardId, boards);
  const boardsArray = asArrayByOrder(boards, boards.order)
    .map(({ id, isLoaded, title, subscribe_to_nav_notifications }) => {
      const subscribedChannels = subscriptions.channelsByBoardId[id] || []
      const hasUnreadMessages = subscribedChannels.find(id => channels.byId[id] && channels.byId[id].unread_messages > 0) !== undefined;
      return { id, isLoaded, title, hasUnreadMessages, subscribe_to_nav_notifications, channels: subscribedChannels }
    });

  return ({
    boards: boardsArray,
    boardIsLoaded: isLanding ? true : currentBoard.isLoaded,
    boardIsLoading: isLanding ? false : isLoadingByType(loading, 'Board', currentBoardId, 'loadingBoard')
  })
};

const mapDispatchToProps = dispatch => ({
  requestBoard: (boardId, isTimeZoneUpdate) => dispatch(requestBoard(boardId, isTimeZoneUpdate)),
  removeBoard: board => dispatch(removeBoard(board)),
  removeMember: member => dispatch(removeMember(member)),
  incrementMessageNotifications: notification => dispatch(incrementMessageNotifications(notification))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
