import React  from 'react';
import PropTypes from 'prop-types';

import ListCardForm from './ListCardForm';
import ListContainer from './ListContainer';
import Spinner from '../../misc/Spinner';

const ListIndex = props =>  {
  const lists = props.lists.map(list => (
    <ListContainer
      addCard={props.addCard(list.id)}
      key={list.id}
      list={list} />
  ));

  return (
    <div className="list-index">
      {lists}
      {
        !props.isLoading &&
        <ListCardForm type="list" addItem={props.addList}/>
      }
    </div>
  )
}

ListIndex.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lists: PropTypes.array.isRequired,
  addList: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired
}

export default ListIndex;
