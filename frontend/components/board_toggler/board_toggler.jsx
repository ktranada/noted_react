import React from 'react';
import BoardTogglerTab  from './board_toggler_tab';

class BoardToggler extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(board) {
    return (e) => {
      e.preventDefault();
      if (board.id === this.props.match.params.boardId) {
        return;
      }

      this.props.history.push(`/boards/${board.id}`);
    }
  }

  render() {
    let { boards, match } = this.props;
    const matchBoardId = Number.parseInt(match.params.boardId);
    const boardsList = boards.map((board) => {
      let isCurrentBoard = matchBoardId === board.id;
      return (<BoardTogglerTab
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

export default BoardToggler;
