import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
// import Spinner from '../misc/spinner';
import BoardConfiguration from './top_section/BoardConfiguration';
import BoardContentController from './middle_section/BoardContentController';

class BoardNav extends React.Component {
  constructor(props) {
    super(props);

    this.handleInviteButton = this.handleInviteButton.bind(this);
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

  handleInviteButton() {
    this.props.toggleModal("ADD_BOARD");
  }

  render() {
    let inviteButton = null;

    if (this.props.members.length === 0) {
      inviteButton = (
        <div className="initial-invite-display">
          <button
            type="button"
            onClick={this.handleInviteButton}
            className="button button-green"
          ><i className="material-icons">&#xE7FB;</i>Invite People</button><i className="material-icons">&#xE14C;</i></div>
      )
    }

    return (
      <div>
        <BoardConfiguration {...this.props.currentBoard} />
        <hr />
        { inviteButton }
        { inviteButton && <hr />}
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
