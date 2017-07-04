import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import Card from './Card';
import ListCardForm from './ListCardForm';

const cardsTarget = {
  hover(props, monitor) {
    const { listId } = monitor.getItem();
    const { id: nextListId } = props.list;
    if (listId !== nextListId) {
      // props.listCallbacks.moveList(id, props.pos);
    }
  },
  drop(props, monitor, component) {
    const { direction } = component.state;
    const { id: listId } = component.props.list;
    return { direction, listId };
  }
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Cards extends React.Component {
  constructor(props) {
    super(props);
    // We use this to avoid dispatching actions while hovering
    this.state = {
      placeholderIndex: null,
      height: 0,
      beginningDrag: false,
      direction: 'down'
    }

    this.setPlaceholderIndex = this.setPlaceholderIndex.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(state, value) {
    this.setState({
      [state]: value
    });
  }

  setPlaceholderIndex(index, height, options = {}) {
     const {
       beginDrag = false,
       direction = 'down'
     } = options;
    // if (!beginDrag && index === this.state.placeholderIndex) {
    //   //
    //   return;
    // }
    console.log('placeholder index: ', index)
    this.setState({
      placeholderIndex: index,
      beginningDrag: beginDrag,
      height,
      direction
    });
  }

  render() {
    const { list, cards, isOver, connectDropTarget, isDragging} = this.props;
    const { placeholderIndex, beginningDrag } = this.state;
    const count = cards.length;
    const isDraggingFromBottom = beginningDrag && placeholderIndex + 1 === count;
    const cardList = [];
    cards.forEach((card, position) => {
      if (isOver && placeholderIndex === -1 && position === 0) {
        // Because we're not updating the card positions after hover,
        // we subtract 1 from it's original position to go back up tge list
        cardList.push(<li className="placeholder__card" style={{ height:this.state.height }} key="placeholder-start"></li>)
      }
      if (card !== undefined) {
        cardList.push(
          <Card
            key={card.id}
            position={position}
            listId={list.id}
            boardId={list.board_id}
            beginningDrag={beginningDrag}
            placeholderIndex={placeholderIndex}
            setPlaceholderIndex={this.setPlaceholderIndex}
            cardCallbacks={this.props.cardCallbacks}
            updateState={this.updateState}
            card={card}
          />
        )
      }

      if ((isOver || isDraggingFromBottom) && this.state.placeholderIndex === position) {
        // The initla drag will hide the card from the DOM, making the list shorter
        // and it will be considered `not over`
        cardList.push(<li  className="placeholder__card" style={{ height:this.state.height }} key="placeholder-end"></li>)
      }
    })

    return connectDropTarget(
        <ul className="list__cards">
          {cardList}
        </ul>
      );
  }
}

Cards.propTypes = {
  list: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  cardCallbacks: PropTypes.shape({
    moveCard: PropTypes.func.isRequired
  }).isRequired
}


export default DropTarget('card', cardsTarget, dropCollect)(Cards);
