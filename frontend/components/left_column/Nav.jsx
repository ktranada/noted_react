import React from 'react';
import NavTab  from './NavTab';
import { getCurrentBoardById } from '../../reducers/selectors';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    if (!this.props.isLanding && this.props.currentBoard) {
      this.requestBoard(this.props.currentBoard);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoard &&
        (!Boolean(this.props.currentBoard) ||
         nextProps.currentBoard.id !== this.props.currentBoard.id)) {
      this.requestBoard(nextProps.currentBoard);
    }
    const nextBoardId = nextProps.match.params.boardId;
    if (nextProps.match.path !== '/boards' && !Boolean(Number.parseInt(nextBoardId))) {
      this.props.history.replace('/boards');
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
    let { boards, match } = this.props;
    const matchBoardId = Number.parseInt(match.params.boardId);
    const boardsList = boards.map((board) => {
      let isCurrentBoard = matchBoardId === board.id;
      return (<NavTab
        isCurrentBoard={isCurrentBoard}
        handleClick={this.handleClick(board)}
        key={board.id}
        {...board } />
    )});

    let boardFormButton = null;
    if (boardsList.length < 3) {
      boardFormButton = <NavTab
        handleClick={this.toggleModal}
        isButton={true}
        key={-1}
        />
    }

    return (
      <ul className="nav">
        {boardsList}
        {boardFormButton}
      </ul>
    );
  }
}

export default Nav;
