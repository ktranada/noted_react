import React from 'react';
import PropTypes from 'prop-types';
import CommentIndex from './CommentIndex';
import CardActionsContainer from './CardActionsContainer';

const propTypes = {
  card: PropTypes.object.isRequired,
  boardId: PropTypes.number.isRequired
}

const Body = props => {

  return (
    <div className="card__body">
      <i className="material-icons">&#xE24C;</i>
      <CommentIndex
        comments={props.comments}
        members={props.members}
        boardId={props.boardId}
        card={props.card}
        createComment={props.createComment}
      />
      <CardActionsContainer boardId={props.boardId} cardId={props.card.id}/>
    </div>
  )
}

Body.propTypes = propTypes;
export default Body;
