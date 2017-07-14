import React from 'react';
import { Route } from 'react-router-dom';

import { ADD_BOARD, INVITE_PEOPLE, BOARD_SETTINGS, ACCOUNT_SETTINGS } from '../../actions/modal_actions';
import AddBoardModalContainer from './add_board/AddBoardModalContainer';
import InviteMembersModalContainer from './invite_members/InviteMembersModalContainer';
import OwnerBoardSettingsModalContainer from './settings/board/OwnerBoardSettingsModalContainer';
import MemberBoardSettingsModalContainer from './settings/board/MemberBoardSettingsModalContainer';
import AccountSettingsModalContainer from './settings/account/AccountSettingsModalContainer';

function ModalController(props) {
  let Modal = null;
  switch (props.modal) {
    case ADD_BOARD:
      Modal = AddBoardModalContainer;
      break;
    case INVITE_PEOPLE:
      Modal = InviteMembersModalContainer;
      break;
    case BOARD_SETTINGS:
      if (props.currentBoard.owner) {
        Modal = OwnerBoardSettingsModalContainer;
      } else {
        Modal = MemberBoardSettingsModalContainer;
      }
      break;
    case ACCOUNT_SETTINGS:
      Modal = AccountSettingsModalContainer;
      break;
  }

  if (!Modal) return null;

  return <Modal
    {...props}
    hideModal={props.hideModal}
    currentBoard={props.currentBoard} />
}

export default ModalController;
