import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

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

class Cards extends React.Component {
  render() {
    const {
      list,
      cards,
      connectDropTarget,
      cardCallbacks,
      isCardOver
    } = this.props;
    const cardList = [];
    this.props.cards.forEach((card, position) => {
      if (card !== undefined) {
        cardList.push(
          <Card
            key={card.id}
            boardId={list.board_id}
            listId={list.id}
            id={card.id}
            position={position}
            title={card.title}
            height={this.props.height}
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
}

Cards.propTypes = propTypes;

export default Cards;
