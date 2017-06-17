import React from 'react';
import { Route } from 'react-router-dom';
import { ADD_BOARD, VIEW_CARD } from '../../actions/modal_actions';
import AddBoardModalContainer from './add_board/AddBoardModalContainer';

const ModalController = (props) => {

  switch (props.currentModal) {
    case ADD_BOARD:
      return <AddBoardModalContainer hideModal={props.hideModal}/>
    default:
      return null;
  }
}

export default ModalController;
