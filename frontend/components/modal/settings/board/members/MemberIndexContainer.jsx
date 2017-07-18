import { connect } from 'react-redux';
import { asArrayByOrder } from '../../../../../reducers/selectors';
import { destroyMembership } from '../../../../../actions/board_actions';
import MemberIndex from './MemberIndex';

const mapStateToProps = ({ session, members }, { boardMembers }) => ({
  members: asArrayByOrder(members, boardMembers),
  currentUserId: session.currentUser.id
})

const mapDispatchToProps = (dispatch, { boardId }) => {
  return({
    destroyMembership: id => dispatch(destroyMembership(boardId, id))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberIndex)
