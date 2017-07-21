import React from 'react';
import PropTypes from 'prop-types';
import CommentIndex from './CommentIndex';
import CardActions from './CardActions';

const propTypes = {
  card: PropTypes.object.isRequired,
  boardId: PropTypes.number.isRequired,
  members: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
  createComment: PropTypes.func.isRequired,
  destroyCard: PropTypes.func.isRequired,
}

const defaultProps = {
  members: {},
  comments: []
}

const Body = props => (
  <div className="card__body">
    <i className="material-icons">&#xE24C;</i>
    <CommentIndex
      comments={props.comments}
      members={props.members}
      boardId={props.boardId}
      card={props.card}
      createComment={props.createComment}
    />
    <CardActions
      destroyCard={props.destroyCard}
    />
  </div>
)


Body.propTypes = propTypes;
Body.defaultProps = defaultProps;

export default Body;
