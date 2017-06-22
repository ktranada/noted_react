import { connect } from 'react-redux';
import { getObjectById } from '../../../../reducers/selectors';
import CommentIndexItem from './CommentIndexItem';

const mapStateToProps = ({ members }, { comment }) => {
  const author = getObjectById(comment.author_id, members)
  return ({
    username: author ? author.usernamesByBoardId[boardId] : "Deactivated User"
  })
}

export default connect(
  mapStateToProps
)(CommentIndexItem)
