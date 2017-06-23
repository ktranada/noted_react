import { connect } from 'react-redux';
import { remainingInviteCount } from '../../reducers/selectors';
import InitialBoardContent from './InitialBoardContent';

const mapStateToProps = ({ invites }, { currentBoard }) => ({
  hasInvites: remainingInviteCount(invites, currentBoard) > 0
})

export default connect(
  mapStateToProps,
)(InitialBoardContent)
