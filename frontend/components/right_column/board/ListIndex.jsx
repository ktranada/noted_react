import React  from 'react';
import PropTypes from 'prop-types';

import ListCardForm from './ListCardForm';
import ListContainer from './ListContainer';
import Spinner from '../../misc/Spinner';

const ListIndex = props =>  {
  const lists = props.lists.map((list, position) => (
    <ListContainer
      key={list.id}
      id={list.id}
      position={position}
      list={list}
      cardCallbacks={props.cardCallbacks}
      listCallbacks={props.listCallbacks} />
  ));

  return (
    <div id="list-index__scroller" className="list-index">
      {lists}
      <ListCardForm type="list" addItem={props.listCallbacks.addList}/>
    </div>
  )
}

ListIndex.propTypes = {
  lists: PropTypes.array.isRequired,
  listCallbacks: PropTypes.shape({
    addList: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    updateListOrder: PropTypes.func.isRequired
  }).isRequired,
  cardCallbacks: PropTypes.shape({
    moveCard: PropTypes.func.isRequired,
  }).isRequired
}

export default ListIndex;
