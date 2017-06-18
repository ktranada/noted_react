import React from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import CommentIndexItemContainer from './CommentIndexItemContainer';

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

    this.addComment = this.addComment.bind(this);
  }

  addComment(data) {
    this.props.createComment(data);
  }

  render() {
    const comments = this.props.comments.map(comment => (
      <CommentIndexItemContainer
        key={comment.id}
        comment={comment} />
    ))
    return(
      <div className="card__comments">
        <h4>Add a comment</h4>
        <CommentForm
          cardId={this.props.cardId}
          addComment={this.addComment}/>
        { comments }
      </div>
    )
  }
}

CommentIndex.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  createComment: PropTypes.func.isRequired
}

CommentIndex.defaultProps = {
  comments: []
}

export default CommentIndex;
