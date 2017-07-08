import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import Cards from './Cards';
import ListCardForm from './ListCardForm';

const propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  listCallbacks: PropTypes.shape({
    addCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    updateListOrder: PropTypes.func.isRequired
  }).isRequired,
  cardCallbacks: PropTypes.shape({
    setHoveredListId: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
  }).isRequired
}

const dropSpecs = {
  drop(props, monitor, component) {
    if (monitor.getItemType() === 'card') {
      const id = monitor.getItem().id;
      const {
        id: list_id,
        cards
       } = props;

      const position = cards.length === 0 ? 0 : cards.findIndex(card => card.id === id)
       return {
         id,
         list_id,
         position
       };
    }

    const { position } = monitor.getItem();
    const { position: nextPosition } = props;
    if (position !== nextPosition) {
      props.listCallbacks.updateListOrder();
    }
  },
  hover(props, monitor, component) {
    const { id } = monitor.getItem();
    if (monitor.getItemType() === 'list') {

      const { id: nextListId } = props;
      if (id !== nextListId) {
        props.listCallbacks.moveList(id, props.position);
      }
      return;
     }

     if (monitor.getClientOffset().y > component.listItem.offsetHeight - 50){
       // Add card to end of list if the drag source is below it
       props.cardCallbacks.moveCard(id, props.list.id, props.cards.length)
     }
  }
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    item: monitor.getItem(),
    isOver: monitor.isOver(),
    type: monitor.getItemType()
  }
}

const dragSpecs = {
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

class List extends React.Component  {
  render() {
    const {
      list,
      cards,
      connectDragSource,
      connectDropTarget,
      isDragging,
      item,
      isOver,
      type,
      cardCallbacks,
      listCallbacks
    } = this.props;

    const { clientHeight = 0 } = item || {};

    return connectDropTarget(
      <div className="list-index__item-wrapper">
        {
          connectDragSource(
              <div
                ref={el => this.listItem = el}
                className={`list-index__item ${isDragging ? "placeholder" : ""}`}>
                <header>{list.id}</header>
                <hr />
                  <Cards
                    list={list}
                    cards={cards}
                    height={clientHeight}
                    isCardOver={isOver && type ==='card'}
                    cardDragTracker={this.props.cardDragTracker}
                    cardCallbacks={this.props.cardCallbacks}
                  />
                  <ListCardForm type="card" addItem={this.props.listCallbacks.addCard(list.id)} />
              </div>
            )
        }
      </div>
    )
  }
}

List.propTypes = propTypes;

export default DragSource(
  'list', dragSpecs, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(DropTarget(['list', 'card'], dropSpecs, dropCollect)(List));
