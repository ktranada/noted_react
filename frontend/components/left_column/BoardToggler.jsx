import React from 'react';
import BoardTogglerTab  from './BoardTogglerTab';

class BoardToggler extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleClick(board) {
    return (e) => {
      e.preventDefault();
      if (board.id === Number.parseInt(this.props.match.params.boardId)) {
        return;
      }

      this.props.history.push(`/boards/${board.id}`);
    }
  }

  toggleModal() {
    this.props.toggleModal()
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

    let boardFormButton = null;
    if (boardsList.length < 3) {
      boardFormButton = <BoardTogglerTab
        onclick={this.toggleModal}
        isButton={true}
        key={-1}
        />
    }

    return (
      <ul className="board-toggle">
        {boardsList}
        {boardFormButton}
      </ul>
    );
  }
}

export default BoardToggler;
