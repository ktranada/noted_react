import { connect } from 'react-redux';
import { getObjectById } from '../../../../reducers/selectors';
import CommentIndexItem from './CommentIndexItem';

const mapStateToProps = ({ members }, { comment }) => {
  return ({
    author: getObjectById(comment.author_id, members)
  })
}

export default connect(
  mapStateToProps
)(CommentIndexItem)
