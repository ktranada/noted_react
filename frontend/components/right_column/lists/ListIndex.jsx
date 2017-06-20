import React  from 'react';
import PropTypes from 'prop-types';
import ListCardForm from './ListCardForm';
import ListContainer from './ListContainer';
import Spinner from '../../misc/spinner';

class ListIndex extends React.Component {
  constructor(props) {
    super(props);

    this.createList = this.createList.bind(this);
  }

  createList(data) {
    const list = Object.assign({}, data, {
      ord: this.props.lists.length,
      board_id: this.props.match.params.boardId
    })
    return this.props.createList(list);
  }

  render() {
    const lists = this.props.lists.map(list => (
      <ListContainer
        key={list.id}
        boardId={this.props.currentBoard.id}
        list={list} />
    ));

    let content = null;
    if (this.props.isLoading) {
      content = <Spinner />
    } else {
      content = (
        <div className="list-index">
          { lists }
          <ListCardForm type="list" createItem={this.createList}/>
        </div>
      )
    }
    return (
      <div className="board-wrapper">
        { content }
      </div>
    )
  }
}

ListIndex.propTypes = {
  lists: PropTypes.array.isRequired,
  createList: PropTypes.func.isRequired
}

export default ListIndex;
