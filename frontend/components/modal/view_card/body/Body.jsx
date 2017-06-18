import React from 'react';
import PropTypes from 'prop-types';
import CommentIndexContainer from './CommentIndexContainer';
import CardActionsContainer from './CardActionsContainer';

const Body = props => {
  return (
    <div className="card__body">
      <i className="material-icons">&#xE24C;</i>
      <CommentIndexContainer card={props.card} />
      <CardActionsContainer cardId={props.card.id}/>
    </div>
  )
}

Body.propTypes = {
  card: PropTypes.object.isRequired
}

export default Body;
