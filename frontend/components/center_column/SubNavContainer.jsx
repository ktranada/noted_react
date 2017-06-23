import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SubNav from './SubNav';
import { getCurrentBoardById, asArrayByOrder, isLoadingByType } from '../../reducers/selectors';
import { requestChannels } from '../../actions/sub_nav_actions';

const mapStateToProps = ({ boards, channels, members, loading }, { currentBoard }) => {
  return ({
    channels: asArrayByOrder(channels, currentBoard.channels),
    members: asArrayByOrder(members, currentBoard.members),
    isLoading: isLoadingByType(loading, currentBoard.id, "loadingBoard")
  });
}

export default connect(
  mapStateToProps
)(SubNav);
