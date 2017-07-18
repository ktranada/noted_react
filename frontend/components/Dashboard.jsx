import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import { RouteWithProps } from '../util/route_util';
import NavContainer from './nav/NavContainer';
import SubNavContainer from './sub_nav/SubNavContainer';
import AccountSettings from './sub_nav/bottom_section/AccountSettings';
import ModalControllerContainer from './modal/ModalControllerContainer';
import InitialBoardContentContainer from './board_content/InitialBoardContentContainer';
import BoardContentContainer from './board_content/board/BoardContentContainer';
import ChatRoomContainer from './board_content/chat/ChatRoomContainer';
import ViewCardModalContainer from './modal/view_card/ViewCardModalContainer';

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    if (!Boolean(this.props.currentBoard)) {
      this.props.history.push('/boards');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Boolean(nextProps.currentBoard)) {
      this.props.history.push('/boards');
    }
  }

  toggleModal(type, options = {}) {
    return () => {
      this.props.toggleModal(type, options);
    }
  }

  render() {
    if (!Boolean(this.props.currentBoard)) {
      return null;
    }

    const { isLoading, currentUser, currentBoard, history } = this.props;

    return (
      <div className="landing-container">
        <section className="nav">
          <NavContainer
            isLanding={false}
            history={history}
            timezone={currentUser.timezone}
            currentUserId={currentUser.id}
            currentBoardId={currentBoard.id}
            toggleModal={this.toggleModal}
          />
        </section>

        <section className="sub-nav">
          <SubNavContainer {...this.props} />
          <AccountSettings
            currentUser={currentUser}
            toggleModal={this.toggleModal}
          />
        </section>

        <section className="board-content">
          <Switch>
            <RouteWithProps
              path="/boards/:boardId/card/:cardId"
              component={BoardContentContainer}
              currentBoard={currentBoard}
              currentUserId={currentUser.id}
            />

            <RouteWithProps
              path="/boards/:boardId/lists"
              component={BoardContentContainer}
              currentBoard={currentBoard}
              currentUserId={currentUser.id}
            />
            <RouteWithProps
              path="/boards/:boardId/messages/:channelId"
              component={ChatRoomContainer}
              currentBoard={currentBoard}
              isLoading={isLoading}
            />
            <RouteWithProps
              path="/boards/:boardId"
              isLoading={isLoading}
              currentBoard={currentBoard}
              component={InitialBoardContentContainer}
              toggleModal={this.toggleModal}
            />

          </Switch>
        </section>

        <RouteWithProps
          path="/boards/:boardId/card/:cardId"
          currentUserId={currentUser.id}
          component={ViewCardModalContainer}
          currentBoard={currentBoard} />

        <ModalControllerContainer {...this.props}/>
      </div>
    )
  }
}

Dashboard.propTypes = {
  currentBoard: PropTypes.object
}

export default Dashboard;
