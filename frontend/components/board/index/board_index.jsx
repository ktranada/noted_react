import React from 'react';
import BoardIndexItem  from './board_index_item';

class BoardIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(board) {
    return (e) => {
      e.preventDefault();
      if (board.id === this.props.currentBoard.id) {
        return;
      }
      this.props.setCurrentBoard(board);
      const nextPath = `/boards/${board.id}`
      this.props.history.push(nextPath);
    }
  }

  render() {
    const boards = this.props.boards.map((board) => {
      let isCurrentBoard = this.props.currentBoard.id === board.id;
      return <BoardIndexItem
        isCurrentBoard={isCurrentBoard}
        onclick={this.handleClick(board)}
        key={board.id}
        {...board } />
    });

    return (
      <ul className="board-toggle">
        {boards}
      </ul>
    );
  }
}

export default BoardIndex;
