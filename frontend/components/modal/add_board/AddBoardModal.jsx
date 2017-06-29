import React from 'react';
import ModalOverlayContainer from '../ModalOverlayContainer';
import InitialContent from './InitialContent';
import CreateBoardContent from './CreateBoardContent';
import JoinBoardContent from './join/JoinBoardContent';


class AddBoardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
    }

    this.createBoard = this.createBoard.bind(this);
    this.handleBoardSelection = this.handleBoardSelection.bind(this);
  }

  createBoard(board) {
    return this.props.createBoard(board)
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
                history={this.props.history}
                handleBackClick={this.handleBoardSelection('')}
                createBoard={this.createBoard} />
            : (type === 'join')
              ? <JoinBoardContent
                  history={this.props.history}
                  currentUser={this.props.currentUser}
                  getInvite={this.props.getInvite}
                  updateInvite={this.props.updateInvite}
                  handleBackClick={this.handleBoardSelection('')}/>
              : <InitialContent handleBoardSelection={this.handleBoardSelection}/>
        }
      </ModalOverlayContainer>
    )
  }
}

export default AddBoardModal;
