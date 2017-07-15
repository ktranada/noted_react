import React from 'react';
import PropTypes from 'prop-types';

import CommentForm from './CommentForm';
import CommentIndexItem from './CommentIndexItem';
import { getObjectById } from '../../../../reducers/selectors';

const propTypes = {
  boardId: PropTypes.number.isRequired,
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired
  }),
  members: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  createComment: PropTypes.func.isRequired
}

function CommentIndex(props) {
  const { members, boardId } = props;
  const comments = props.comments.map(comment => {
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
        createComment={props.createComment}
      />
      { comments }
    </div>
  )
}

CommentIndex.propTypes = propTypes;
export default CommentIndex;
