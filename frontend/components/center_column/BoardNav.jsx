import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
// import Spinner from '../misc/spinner';
import BoardConfiguration from './top_section/BoardConfiguration';
import BoardContentController from './middle_section/BoardContentController';

class BoardNav extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (!this.props.currentBoard) {
      this.props.history.push('/boards');
      return;
    }
    this.props.requestChannels(this.props.currentBoard.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.currentBoard) {
      this.props.history.push('/boards');
      return;
    }

    if (nextProps.currentBoard.id !== this.props.currentBoard.id) {
      this.props.requestChannels(nextProps.currentBoard.id);
    }
  }

  render() {
    console.log('boardnav')
    return (
      <div>
        <BoardConfiguration {...this.props.currentBoard} />
        <hr />
        <BoardContentController
          members={this.props.members}
          channels={this.props.channels}
          {...this.props.currentBoard}/>
      </div>
    )
  }
}
// <Spinner />

export default BoardNav;
