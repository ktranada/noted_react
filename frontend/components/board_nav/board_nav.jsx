import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Spinner from '../misc/spinner';
import BoardConfiguration from './board_configuration';
import BoardContentController from './board_content_controller';

class BoardNav extends React.Component {
  componentWillMount() {
    this.props.requestConversations(this.props.currentBoard.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoard.id !== this.props.currentBoard.id) {
      this.props.requestConversations(nextProps.currentBoard.id);
    }
  }

  render() {
    return (
      <div>
        <BoardConfiguration {...this.props.currentBoard} />
        <hr />
        <BoardContentController
          conversations={this.props.conversations}
          {...this.props.currentBoard}/>
      </div>
    )
  }
}
// <Spinner />

export default BoardNav;
