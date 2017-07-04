import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';

const dragSpecs = {
  beginDrag(props, monitor, component) {
    const { id, title } = props.card;
    const { clientWidth, clientHeight } = findDOMNode(component);
    props.setPlaceholderIndex(props.position, clientHeight, { beginDrag: true });
    return {
      id,
      title,
      clientWidth,
      clientHeight,
      position: props.position,
      listId: props.listId
    }
  },

  endDrag(props, monitor) {
    let { placeholderIndex: nextPos } = props;
    const { id, listId: prevListId, position: prevPos } = monitor.getItem();
    const { direction, listId: nextListId } = monitor.getDropResult();

    if (direction === 'up') {
      // To simulate backwards traversal, we subtracted 1 from the original position
      nextPos += 1;
    }

    if (prevListId === nextListId) {
      props.cardCallbacks.moveCard(id, prevListId, nextListId, nextPos);
    }
    props.setPlaceholderIndex(null, 0);
  }
}

const dropSpecs = {
  drop(props, monitor) {
    console.log('inside');
    const { position: nextPos, listId: nextListId } = props;
    if (listId === nextListId) {
      props.cardCallbacks.moveCard(id, listId, nextListId, nextPos);
    }

  },

  hover(props, monitor, component) {
    const { id, listIdposition: pos, clientHeight } = monitor.getItem();
    const { position: nextPos, listId: nextListId } = props;

    if (props.card && id !== props.card.id) {
      console.log(`hovering- id: ${props.card.id}, pos: ${nextPos}`)
      if (nextPos === props.placeholderIndex) {
        // Going up the list of cards
        props.setPlaceholderIndex(nextPos - 1, clientHeight, { direction: 'up' });
      } else {
        // Going down the list of cards
        if (props.beginningDrag) {
          props.updateState('beginningDrag', false);
        } else {
          props.setPlaceholderIndex(nextPos, clientHeight);
        }
      }

    }
  }
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Card extends React.Component {
  render() {
    const draggingStyle= { display: 'none' };
    const hoverStyle = { opacity: .5 };
    const { title, id } = this.props.card;
    const { boardId, isDragging, isOver, connectDragSource,
      connectDropTarget, position, placeholderIndex } = this.props;

    return connectDropTarget(connectDragSource(
      <li>
        <Link to={`/boards/${boardId}/card/${id}`}>
          <div
            style={isDragging ? draggingStyle : isOver ? hoverStyle : null}
            role="button"
            className="list__card cursor-pointer">
            <span>{id}</span>
          </div>
        </Link>
      </li>
    ));
  }
}

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  listId: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  cardCallbacks: PropTypes.shape({
    moveCard: PropTypes.func.isRequired
  }).isRequired,
  beginningDrag: PropTypes.bool.isRequired,
  placeholderIndex: PropTypes.number,
  setPlaceholderIndex: PropTypes.func.isRequired,
  updateState: PropTypes.func.isRequired
}

export default DropTarget(
  'card', dropSpecs, dropCollect)(DragSource(
'card', dragSpecs, dragCollect)(Card));
