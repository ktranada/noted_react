import React from 'react';
import BoardTogglerTab  from './BoardTogglerTab';
import { getCurrentBoardById } from '../../reducers/selectors';

class BoardToggler extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    this.requestBoard(this.props.currentBoard);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoard && nextProps.currentBoard.id !== this.props.currentBoard.id) {
      console.log('inside');
      this.requestBoard(nextProps.currentBoard);
    }
  }

  requestBoard(board) {
    if (board && !board.isLoaded && !board.isLoading) {
      console.log('requesting');
      this.props.requestBoard(board.id);
    }
  }


  handleClick(board) {
    return (e) => {
      e.preventDefault();
      if (board.id === Number.parseInt(this.props.match.params.boardId)) {
        return;
      }

      this.props.history.push(`/boards/${board.id}/lists`);
    }
  }

  toggleModal() {
    this.props.toggleModal()
  }

  render() {
    console.log("boardtoggler")
    let { boards, match } = this.props;
    const matchBoardId = Number.parseInt(match.params.boardId);
    const boardsList = boards.map((board) => {
      let isCurrentBoard = matchBoardId === board.id;
      return (<BoardTogglerTab
        isCurrentBoard={isCurrentBoard}
        handleClick={this.handleClick(board)}
        key={board.id}
        {...board } />
    )});

    let boardFormButton = null;
    if (boardsList.length < 3) {
      boardFormButton = <BoardTogglerTab
        handleClick={this.toggleModal}
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
