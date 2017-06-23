import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { RouteWithProps } from '../util/route_util';
import NavContainer from './left_column/NavContainer';
import SubNavContainer from './center_column/SubNavContainer';
import AccountInfo from './center_column/bottom_section/AccountInfo';
import ModalControllerContainer from './modal/ModalControllerContainer';
import InitialBoardContentContainer from './right_column/InitialBoardContentContainer';
import ListIndexContainer from './right_column/lists/ListIndexContainer';
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

    const { isLoading, currentUser, currentBoard } = this.props;

    return (
      <div className="landing-container">
        <section className="left-column">
          <NavContainer
            {...this.props}
            toggleModal={this.toggleModal}/>
        </section>

        <section className="center-column">
          <SubNavContainer {...this.props} />
          <AccountInfo
            currentUser={currentUser}
            toggleModal={this.toggleModal}/>
        </section>

        <section className="right-column">
          <Switch>
            <RouteWithProps
              path="/boards/:boardId/card/:cardId"
              component={ListIndexContainer}
              currentBoard={currentBoard} />

            <RouteWithProps
              path="/boards/:boardId/lists"
              component={ListIndexContainer}
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
