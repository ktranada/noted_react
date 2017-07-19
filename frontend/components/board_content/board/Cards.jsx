import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import ListCardForm from './ListCardForm';

const propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  cardCallbacks: PropTypes.shape({
    moveCard: PropTypes.func.isRequired,
    setHoveredListId: PropTypes.func.isRequired
  }).isRequired
}

const Cards = (props) => {
  const {
    list,
    cards,
    connectDropTarget,
    cardCallbacks,
    isCardOver,
    prevHoveredListId,
    height
  } = props;
  const cardList = [];
  cards.forEach((card, position) => {
    if (card !== undefined) {
      cardList.push(
        <Card
          key={card.id}
          boardId={list.board_id}
          listId={list.id}
          id={card.id}
          prevHoveredListId={prevHoveredListId}
          position={position}
          title={card.title}
          height={height}
          cardCallbacks={cardCallbacks}
        />
      )
    }
  })
  return (
      <ul
      className="list__cards">
        {cardList}
      </ul>
    );
}

Cards.propTypes = propTypes;

export default Cards;
