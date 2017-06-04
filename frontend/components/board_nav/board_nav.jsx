import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../misc/spinner';
import BoardConfiguration from './board_configuration';

class BoardNav extends React.Component {
  render() {
    return (
      <div className="board-actions">
        <BoardConfiguration {...this.props.currentBoard} />
        <hr />
      </div>
    )
  }
}
// <Spinner />

export default BoardNav;
