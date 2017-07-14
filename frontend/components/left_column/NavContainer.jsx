import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asArrayByOrder, getCurrentBoardById } from '../../reducers/selectors';
import { requestSubscriptions, requestBoard } from '../../actions/nav_actions';
import { incrementMessageNotifications } from '../../actions/notification_actions';
import Nav from './Nav';

const mapStateToProps = ({ boards, subscriptions }, { currentBoardId, isLanding }) => {
  const currentBoard = getCurrentBoardById(currentBoardId, boards);
  const boardsArray = asArrayByOrder(boards, boards.order)
    .map(({ id, isLoaded, title, hasUnreadMessages }) => {
      const channels = subscriptions.channelsByBoardId[id] || []
      return { id, isLoaded, title, channels, hasUnreadMessages, channels }
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
  requestSubscriptions: () => dispatch(requestSubscriptions())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
