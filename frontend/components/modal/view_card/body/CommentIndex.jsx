import React from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import CommentIndexItem from './CommentIndexItem';
import { getObjectById } from '../../../../reducers/selectors';

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

    this.createComment = this.createComment.bind(this);
  }

  createComment(data) {
    this.props.createComment(data);
  }

  render() {
    const { members, boardId } = this.props;
    const comments = this.props.comments.map(comment => {
      const author = getObjectById(comment.author_id, members);
      const username = author ? author.usernamesByBoardId[boardId] : "Deactivated User";

      return(
        <CommentIndexItem
          key={comment.id}
          username={username}
          comment={comment}/>
      )
    });
    return(
      <div className="card__comments">
        <h4>Add a comment</h4>
        <CommentForm
          createComment={this.createComment}/>
        { comments }
      </div>
    )
  }
}

CommentIndex.propTypes = {
  boardId: PropTypes.number.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired
  }),
  members: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  createComment: PropTypes.func.isRequired
}

export default CommentIndex;
