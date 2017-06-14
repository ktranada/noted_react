import React from 'react';
import ModalWrapperContainer from '../ModalWrapperContainer';

class AddBoardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: ''
    }
  }

  render() {
    return (
      <ModalWrapperContainer>
        <div className="board-form-initial">
          <div className="board-form-initial__create">
            <p>Just getting started? Create a board and gather your thoughts.</p>
            <button type="button" className="">Create a Board</button>
          </div>

          <div className="board-form-initial__join">
            <p>Receive a board invite? Enter the code and start collaborating.</p>
            <button type="button" className="">Join a Board</button>
          </div>
        </div>
      </ModalWrapperContainer>
    )
  }
}

export default AddBoardModal;
