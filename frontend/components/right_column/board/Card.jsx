import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';

const propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  listId: PropTypes.number.isRequired,
  boardId: PropTypes.number,
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  cardCallbacks: PropTypes.shape({
    setHoveredListId: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired
  }),
  isPlaceholder: PropTypes.bool
}

const defaultProps = {
  id: -1,
  title: "",
  boardId: -1,
  isPlaceholder: false
}

const dragSpecs = {
  beginDrag(props, monitor, component) {
    const { id, title, listId, position } = props;
    props.cardCallbacks.setHoveredListId(listId);
    return {
      id,
      listId,
      title,
      position,
      clientHeight: component.cardItem.clientHeight
    }
  },

  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if (dropResult === null || !dropResult.id) return;

    props.cardCallbacks.updateCardPosition(dropResult);
  },

  isDragging(props, monitor) {
    return props.id == monitor.getItem().id;
  }
}

const dropSpecs = {
  hover(props, monitor, component) {
    const { id, clientHeight } = monitor.getItem();
    const { position: nextPos, listId: nextListId } = props;
    if (id !== props.id) {
      const cardRef = component.getDecoratedComponentInstance().cardItem;
      const { height, bottom, top }  = cardRef.getBoundingClientRect();

      let shouldMove = false;
      if (height > 60) {
        const centerPos = Math.floor(clientHeight / 2)
        const { y: currentOffset } = monitor.getClientOffset();
        const { y: rootOffset} = monitor.getInitialSourceClientOffset();
        const { y: initialClientOffset} = monitor.getInitialClientOffset();

        const threshold = Math.floor(height / 3);

        // Center of the drag source
        const y = monitor.getClientOffset().y + (centerPos - (monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y));

        shouldMove = (
          y <= top / 2
            ? bottom - threshold < y && y < bottom
            :  top < y && y < top + threshold
        )
      }

      if (height <= 60 || shouldMove) {
        props.cardCallbacks.moveCard(id, nextListId, nextPos);
      }
    }
  }
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }
}

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    monitorItem: monitor.getItem(),
    isDragging: monitor.isDragging()
  }
}

class Card extends React.PureComponent {

  constructor(props) {
    super(props);

    this.cardItem = null;
  }

  render() {
    const {
      boardId,
      id,
      title,
      connectDragSource,
      connectDropTarget,
      height,
      isDragging,
      monitorItem,
      isOver
    } = this.props;

    return connectDropTarget(connectDragSource(
      <li ref={el => this.cardItem = el }>
        <Link
          to={`/boards/${boardId}/card/${id}`}>
          {
            isDragging && monitorItem && monitorItem.id === id
              ? <div className="placeholder__card" style={{ height }} />
              : (
                  <div
                    role="button"
                    className="list__card cursor-pointer">
                    <span>{title}</span>
                  </div>
                )
          }
        </Link>
      </li>
    ));
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default DropTarget(
  'card', dropSpecs, dropCollect)(DragSource(
'card', dragSpecs, dragCollect)(Card));
