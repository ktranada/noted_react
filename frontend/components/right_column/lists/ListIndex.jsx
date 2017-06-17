import React  from 'react';
import PropTypes from 'prop-types';
import ListCardForm from './ListCardForm';
import ListContainer from './ListContainer';

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
        history={this.props.history}
        list={list} />
    ));

    return (
      <div className="board-wrapper">
        <div className="list-index">
          { lists }

          <ListCardForm type="list" createItem={this.createList}/>
        </div>
      </div>
    )
  }
}

ListIndex.propTypes = {
  lists: PropTypes.array.isRequired,
  createList: PropTypes.func.isRequired
}

export default ListIndex;
