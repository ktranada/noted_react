import { connect } from 'react-redux';
import { asArrayByOrder } from '../../../../../reducers/selectors';
import { destroyMembership } from '../../../../../actions/board_actions';
import MemberIndex from './MemberIndex';

const mapStateToProps = ({ session, members }, { boardMembers }) => ({
  members: asArrayByOrder(members, boardMembers),
  currentUserId: session.currentUser.id
})

export default connect(
  mapStateToProps,
)(MemberIndex)
