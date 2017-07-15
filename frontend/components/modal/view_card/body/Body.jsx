import React from 'react';
import PropTypes from 'prop-types';
import CommentIndex from './CommentIndex';
import CardActionsContainer from './CardActionsContainer';

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
      <CardActionsContainer cardId={props.card.id}/>
    </div>
  )
}

Body.propTypes = {
  card: PropTypes.object.isRequired
}

export default Body;
