import React from 'react';
import { ADD_BOARD } from '../../actions/modal_actions';

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
