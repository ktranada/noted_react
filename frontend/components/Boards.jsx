import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { RouteWithProps } from '../util/route_util';
import NavContainer from './left_column/NavContainer';
import SubNavContainer from './center_column/SubNavContainer';
import AccountSettings from './center_column/bottom_section/AccountSettings';
import ModalControllerContainer from './modal/ModalControllerContainer';
import InitialBoardContentContainer from './right_column/InitialBoardContentContainer';
import BoardContentContainer from './right_column/board/BoardContentContainer';
import ViewCardModalContainer from './modal/view_card/ViewCardModalContainer';

class Boards extends React.PureComponent {
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

  toggleModal(type) {
    return () => {
      this.props.toggleModal(type);
    }
  }

  render() {
    if (!Boolean(this.props.currentBoard)) {
      return null;
    }

    const { isLoading, currentUser, currentBoard, history } = this.props;

    return (
      <div className="landing-container">
        <section className="left-column">
          <NavContainer
            isLanding={false}
            history={history}
            currentBoardId={currentBoard.id}
            toggleModal={this.toggleModal}/>
        </section>

        <section className="center-column">
          <SubNavContainer {...this.props} />
          <AccountSettings
            currentUser={currentUser}
            toggleModal={this.toggleModal}/>
        </section>

        <section className="right-column">
          <Switch>
            <RouteWithProps
              path="/boards/:boardId/card/:cardId"
              component={BoardContentContainer}
              currentBoard={currentBoard} />

            <RouteWithProps
              path="/boards/:boardId/lists"
              component={BoardContentContainer}
              currentBoard={currentBoard} />

            <RouteWithProps
              path="/boards/:boardId"
              isLoading={isLoading}
              currentBoard={currentBoard}
              component={InitialBoardContentContainer}
              toggleModal={this.toggleModal}/>

          </Switch>
        </section>

        <RouteWithProps
          path="/boards/:boardId/card/:cardId"
          component={ViewCardModalContainer}
          currentBoard={currentBoard} />

        <ModalControllerContainer {...this.props}/>
      </div>
    )
  }
}

Boards.propTypes = {
  currentBoard: PropTypes.object
}

export default Boards;
