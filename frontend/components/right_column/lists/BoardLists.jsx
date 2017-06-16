import React  from 'react';
import ListAddForm from './ListAddForm';

class BoardLists extends React.Component {
  constructor(props) {
    super(props);

    this.createList = this.createList.bind(this);
  }

  createList(data) {
    const list = Object.assign({}, data, {
      ord: this.props.lists.length,
      board_id: this.props.currentBoard.id
    })
    return this.props.createList(list);
  }

  render() {
    const { lists, cards } = this.props;
    return (
      <div className="board-wrapper">
        <ListAddForm createList={this.createList}/>
      </div>
    )
  }
}

export default BoardLists;
