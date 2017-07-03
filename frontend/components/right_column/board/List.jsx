import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import Card from './Card';
import ListCardForm from './ListCardForm';

// const listSource = {
//   beginDrag({ list }) {
//     return { id: list.id, ord: list.ord }
//   }
// }
//
// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   }
// }

const List = ({ list, cards, addCard}) => {
  return (
    <div className="list-index__item-wrapper">
      <div className="list-index__item">
        <header>{list.title}</header>
        <hr />
        <ul className="list__cards">
          {
            cards.map(card => (
              <Card
                boardId={list.board_id}
                key={card.id}
                id={card.id}
                title={card.title} />)
            )
          }
        </ul>

        <ListCardForm type="card" addItem={addCard} />
      </div>
    </div>
  )
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCard: PropTypes.func.isRequired
}

export default List;
