import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { RouteWithProps } from '../util/route_util';
import NavContainer from './left_column/NavContainer';
import SubNavContainer from './center_column/SubNavContainer';
import AccountConfigurationContainer from './center_column/bottom_section/AccountConfigurationContainer';
import ModalControllerContainer from './modal/ModalControllerContainer';
import InitialBoardContentContainer from './right_column/InitialBoardContentContainer';
import ListIndexContainer from './right_column/lists/ListIndexContainer';
import ViewCardModalContainer from './modal/view_card/ViewCardModalContainer';

class Boards extends React.PureComponent {
  constructor(props) {
    super(props);
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

  render() {
    if (!Boolean(this.props.currentBoard)) {
      return null;
    }

    const props = this.props;
    return (
      <div className="landing-container">
        <section className="left-column">
          <NavContainer {...props}/>
        </section>
        <section className="center-column">
          <SubNavContainer {...props} />
        </section>
        <section className="right-column">
          <Switch>
            <RouteWithProps
              path="/boards/:boardId/card/:cardId"
              component={ListIndexContainer}
              currentBoard={props.currentBoard} />

            <RouteWithProps
              path="/boards/:boardId/lists"
              component={ListIndexContainer}
              currentBoard={props.currentBoard} />

            <Route path="/boards/:boardId" component={InitialBoardContentContainer} />

          </Switch>
        </section>

        <RouteWithProps
          path="/boards/:boardId/card/:cardId"
          component={ViewCardModalContainer}
          currentBoard={this.props.currentBoard} />

      <ModalControllerContainer {...props}/>
      </div>
    )
  }
}

Boards.propTypes = {
  currentBoard: PropTypes.object
}

export default Boards;
