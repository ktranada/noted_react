import React from 'react';
import { Route } from 'react-router-dom';
import { ADD_BOARD, INVITE_PEOPLE } from '../../actions/modal_actions';
import AddBoardModalContainer from './add_board/AddBoardModalContainer';
import InvitePeopleModalContainer from './invite_people/InvitePeopleModalContainer';
const ModalController = (props) => {
  switch (props.currentModal) {
    case ADD_BOARD:
      return <AddBoardModalContainer hideModal={props.hideModal}/>
    case INVITE_PEOPLE:
      return <InvitePeopleModalContainer />
    default:
      return null;
  }
}

export default ModalController;
