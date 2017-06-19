import React from 'react';
import PropTypes from 'prop-types';
import Divider from '../../../misc/Divider';

const CommentIndexItem = ({comment, author, boardId}) => {
  console.log(boardId)
  return (
    <div className="card__comment">
      <Divider>
        { comment.create_date}
      </Divider>
      <div className="comment__info">
        <h3>{author.usernamesByBoardId[boardId]}</h3>
        <p>{comment.description}</p>
      </div>
    </div>
  )
}

CommentIndexItem.propTypes ={
  comment: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired
}

export default CommentIndexItem;
