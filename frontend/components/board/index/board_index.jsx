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
      if (board.id === this.props.currentBoardId) {
        return;
      }

      this.props.toggleBoard(board.id);
      this.props.history.push(`/boards/${board.id}`);
    }
  }

  render() {
    let { boards, match } = this.props;
    const matchBoardId = Number.parseInt(match.params.boardId);
    const boardsList = boards.map((board) => {
      let isCurrentBoard = matchBoardId === board.id;
      return (<BoardIndexItem
        isCurrentBoard={isCurrentBoard}
        onclick={this.handleClick(board)}
        key={board.id}
        {...board } />
    )});

    return (
      <ul className="board-toggle">
        {boardsList}
      </ul>
    );
  }
}

export default BoardIndex;
