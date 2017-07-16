import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SubNav from './SubNav';
import { getCurrentBoardById, asArrayByOrder, isLoadingByType } from '../../reducers/selectors';
import { addMessage } from '../../actions/chat_actions';
import { updateAppearance } from '../../actions/sub_nav_actions';
import { setMessageNotification, incrementMessageNotifications } from '../../actions/notification_actions';

const mapStateToProps = ({ boards, channels, members, loading, subscriptions, appearances }, { currentBoard }) => {
  return ({
    appearances: appearances.usersByBoardId[currentBoard.id],
    subscribedChannels: asArrayByOrder(channels, subscriptions.channelsByBoardId[currentBoard.id]),
    channels: asArrayByOrder(channels, currentBoard.channels),
    members: asArrayByOrder(members, currentBoard.members),
    isLoading: isLoadingByType(loading, currentBoard.id, "loadingBoard")
  });
}

const mapDispatchToProps = dispatch => ({
  updateAppearance: appearance => dispatch(updateAppearance(appearance)),
  setMessageNotification: notification => dispatch(setMessageNotification(notification)),
  addMessage: message => dispatch(addMessage(message)),
  incrementMessageNotifications: notification => dispatch(incrementMessageNotifications(notification)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubNav);
