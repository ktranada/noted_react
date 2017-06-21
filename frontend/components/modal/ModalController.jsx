import React from 'react';
import { Route } from 'react-router-dom';
import { ADD_BOARD, INVITE_PEOPLE, BOARD_SETTINGS } from '../../actions/modal_actions';
import AddBoardModalContainer from './add_board/AddBoardModalContainer';
import InvitePeopleModalContainer from './invite_people/InvitePeopleModalContainer';
import BoardSettingsModalContainer from './configuration/BoardSettingsModalContainer';

const ModalController = (props) => {
  let Modal = null;
  switch (props.currentModal) {
    case ADD_BOARD:
      Modal = AddBoardModalContainer;
      break;
    case INVITE_PEOPLE:
      Modal = InvitePeopleModalContainer;
      break;
    case BOARD_SETTINGS:
      Modal = BoardSettingsModalContainer;
      break;
  }

  if (!Modal) return null;

  return <Modal hideModal={props.hideModal} currentBoard={props.currentBoard} />
}

export default ModalController;
