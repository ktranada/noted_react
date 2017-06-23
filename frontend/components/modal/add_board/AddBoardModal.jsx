import React from 'react';
import ModalOverlayContainer from '../ModalOverlayContainer';
import InitialContent from './InitialContent';
import CreateBoardContent from './CreateBoardContent';


class AddBoardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
    }

    this.addBoard = this.addBoard.bind(this);
    this.handleBoardSelection = this.handleBoardSelection.bind(this);
  }

  addBoard(board) {
    this.props.addBoard(board).then((board) => {
      this.props.hideModal();
      this.props.history.push(`/boards/${board.id}`);
    });

  }

  handleBoardSelection(type) {
    return (e) => {
      e.preventDefault();
      this.setState({
        type: type
      });
    }
  }

  render() {
    const { type } = this.state;
    return (
      <ModalOverlayContainer modalType="add-board">
        {
          type === 'create'
            ? <CreateBoardContent
                handleBackClick={this.handleBoardSelection('')}
                createBoard={this.addBoard} />
            : (type === 'join')
              ? null
              : <InitialContent handleBoardSelection={this.handleBoardSelection}/>
        }
      </ModalOverlayContainer>
    )
  }
}

export default AddBoardModal;
