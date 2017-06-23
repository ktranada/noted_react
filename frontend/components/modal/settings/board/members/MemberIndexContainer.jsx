import { connect } from 'react-redux';
import { asArrayByOrder } from '../../../../../reducers/selectors';
import { destroyMembership } from '../../../../../actions/board_actions';
import MemberIndex from './MemberIndex';

const mapStateToProps = ({ session, members }, { currentBoard }) => ({
  members: asArrayByOrder(members, currentBoard.members),
  currentUserId: session.currentUser.id
})

const mapDispatchToProps = (dispatch) => {
  return({
    destroyMembership: id => destroyMembership(id)(dispatch)
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberIndex)
