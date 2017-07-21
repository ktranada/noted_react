import React from 'react';
import PropTypes from 'prop-types';

import ModalOverlayContainer from '../ModalOverlayContainer';
import InitialContent from './InitialContent';
import CreateBoardContent from './CreateBoardContent';
import JoinBoardContent from './join/JoinBoardContent';

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  getInvite: PropTypes.func.isRequired,
  updateInvite: PropTypes.func.isRequired
}


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
    return this.props.createBoard(board).then(
      board => {
        this.props.history.push(`/boards/${board.board.id}`)
      }
    )
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
              ?
                <JoinBoardContent
                  history={this.props.history}
                  email={this.props.currentUser.email}
                  getInvite={this.props.getInvite}
                  requestBoard={this.props.requestBoard}
                  updateInvite={this.props.updateInvite}
                  handleBackClick={this.handleBoardSelection('')}
                />
              : <InitialContent handleBoardSelection={this.handleBoardSelection}/>
        }
      </ModalOverlayContainer>
    )
  }
}

AddBoardModal.propTypes = propTypes;

export default AddBoardModal;
