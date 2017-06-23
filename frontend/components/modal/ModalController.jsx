import React from 'react';
import { Route } from 'react-router-dom';
import { ADD_BOARD, INVITE_PEOPLE, BOARD_SETTINGS } from '../../actions/modal_actions';
import AddBoardModalContainer from './add_board/AddBoardModalContainer';
import InvitePeopleModalContainer from './invite_people/InvitePeopleModalContainer';
import OwnerBoardSettingsContainer from './settings/board/OwnerBoardSettingsContainer';
import MemberBoardSettingsContainer from './settings/board/MemberBoardSettingsContainer';

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
      if (props.currentBoard.owner) {
        Modal = OwnerBoardSettingsContainer;
      } else {
        Modal = MemberBoardSettingsContainer;
      }
      break;
  }

  if (!Modal) return null;

  return <Modal
    {...props}
    hideModal={props.hideModal}
    currentBoard={props.currentBoard} />
}

export default ModalController;
