import React  from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import ListCardForm from './ListCardForm';
import ListContainer from './ListContainer';

const NAV_WIDTH = 64;
const SUBNAV_WIDTH = 250;
const FULL_NAV_WIDTH = NAV_WIDTH + SUBNAV_WIDTH;

const propTypes = {
  prevHoveredListId: PropTypes.number.isRequired,
  lists: PropTypes.array.isRequired,
  listCallbacks: PropTypes.shape({
    createList: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    updateListPosition: PropTypes.func.isRequired
  }).isRequired,
  cardCallbacks: PropTypes.shape({
    moveCard: PropTypes.func.isRequired,
    setHoveredListId: PropTypes.func.isRequired
  }).isRequired
}

const specs = {
  hover(props, monitor, component) {
    const { scroller } = props;
    const elementWidth = monitor.getItem().type === 'card' ? 230 : 250;
    const { x: currentOffset } = monitor.getClientOffset();
    const { x: rootOffset} = monitor.getInitialSourceClientOffset();
    const { x: initialClientOffset} = monitor.getInitialClientOffset();

    if (!scroller.isScrolling) {
      if (currentOffset - (initialClientOffset - rootOffset) - FULL_NAV_WIDTH <= 50) {
        // Take into account where the user grabs the drag source
        // and begin scrolling when the source is 50 pixels away
        props.scroller.scroll('left');
      } else {
        if (window.innerWidth - rootOffset > elementWidth) {
          // 1. Source is still fully in the window
          if (innerWidth - (currentOffset - (initialClientOffset - rootOffset)) <= elementWidth + 15) {
            props.scroller.scroll('right');
          }
        } else if (window.innerWidth - currentOffset > (initialClientOffset - rootOffset)) {
          // When the source is half in/out of the window, scroll right when the source
          // is more than half way out
          props.scroller.scroll('right');
        }
      }
    } else {
      if (innerWidth - (currentOffset - (initialClientOffset - rootOffset)) > elementWidth + 15 ||
          currentOffset - (initialClientOffset - rootOffset) - FULL_NAV_WIDTH > 50) {
        scroller.stopScrolling();
      }
    }
  },

  drop(props, monitor, component) {
    props.scroller.stopScrolling();
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

function ListIndex(props) {
  const lists = props.lists.map((list, position) => (
    <ListContainer
      key={list.id}
      id={list.id}
      position={position}
      list={list}
      prevHoveredListId={props.prevHoveredListId}
      cardCallbacks={props.cardCallbacks}
      listCallbacks={props.listCallbacks}
    />
  ));

  return props.connectDropTarget(
    <div id="list-index__scroller" className="list-index">
      {props.children}
      {lists}
      <ListCardForm type="list" addItem={props.listCallbacks.createList}/>
    </div>
  )
}

ListIndex.propTypes = propTypes;

// export default ListIndex;
export default DropTarget(['list', 'card'], specs, collect)(ListIndex);
