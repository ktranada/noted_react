import React from 'react';
import { Route, Switch } from 'react-router-dom';
import  Spinner  from '../../misc/spinner';
import BoardActionsConfiguration from './board_actions_configuration';

class BoardNav extends React.Component {
  render() {
    return (
      <div className="board-actions">
        <BoardConfiguration {...this.props.currentBoard} />
        <hr />
        <Spinner />
      </div>
    )
  }
}

export default BoardNav;
