import React from 'react';
import PropTypes from 'prop-types';
import Divider from '../../../util/Divider';

const CommentIndexItem = ({comment, username}) => {
  return (
    <div className="card__comment">
      <Divider>
        { comment.create_date}
      </Divider>
      <div className="comment__info">
        <h3>{ username }</h3>
        <p>{comment.description}</p>
      </div>
    </div>
  )
}

CommentIndexItem.propTypes = {
  comment: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired
}


export default CommentIndexItem;
