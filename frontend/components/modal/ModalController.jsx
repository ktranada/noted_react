import React from 'react';
import { ADD_BOARD_MODAL } from '../../actions/modal_actions';

import AddBoardModalContainer from './add_board/AddBoardModalContainer';

const ModalController = (props) => {
  switch (props.currentModal) {
    case ADD_BOARD_MODAL:
      return <AddBoardModalContainer />
    default:
      return null;
  }
}

export default ModalController;
