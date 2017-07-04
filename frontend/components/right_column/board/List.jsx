import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import Cards from './Cards';
import ListCardForm from './ListCardForm';

const listTarget = {
  drop(props, monitor, component) {
    const { position } = monitor.getItem();
    const { position: nextPosition } = props;
    if (position !== nextPosition) {
      props.listCallbacks.updateListOrder();
    }
  },
  hover(props, monitor) {
    const { id } = monitor.getItem();
    const { id: nextListId } = props;
    if (id !== nextListId) {
      props.listCallbacks.moveList(id, props.position);
    }
  }
}

const listSource = {
  beginDrag({ list, position }) {
    return ({ id: list.id, position })
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const List = props => {
  const { list, cards, connectDragSource, connectDropTarget, isDragging} = props;
  return connectDragSource(connectDropTarget(
      <div className="list-index__item-wrapper">
        <div className={`list-index__item ${isDragging ? "placeholder" : ""}`}>
          <header>{list.title}</header>
          <hr />
            <Cards
              list={list}
              cards={cards}
              cardCallbacks={props.cardCallbacks}/>
          <ListCardForm type="card" addItem={props.listCallbacks.addCard(list.id)} />
        </div>
      </div>
    ));
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  listCallbacks: PropTypes.shape({
    addCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    updateListOrder: PropTypes.func.isRequired
  }).isRequired,
  cardCallbacks: PropTypes.shape({
    moveCard: PropTypes.func.isRequired,
  }).isRequired
}

export default DragSource(
  'list', listSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(DropTarget(
    'list', listTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )(List));
