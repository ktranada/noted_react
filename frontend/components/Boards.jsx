import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import NavContainer from './left_column/NavContainer';
import SubNavContainer from './center_column/SubNavContainer';
import AccountConfigurationContainer from './center_column/bottom_section/AccountConfigurationContainer';
import ModalControllerContainer from './modal/ModalControllerContainer';
import InitialBoardContentContainer from './right_column/InitialBoardContentContainer';
import ListIndexContainer from './right_column/lists/ListIndexContainer';
import ViewCardModalContainer from './modal/view_card/ViewCardModalContainer';

class Boards extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!Boolean(this.props.currentBoard)) {
      this.props.history.push('/boards');
    }
  }

  render() {
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
            <Route path="/boards/:boardId/card/:cardId" render={props => (
                <ListIndexContainer currentBoard={this.props.currentBoard} />
              )} />
            <Route path="/boards/:boardId/lists" render={props => (
                <ListIndexContainer currentBoard={this.props.currentBoard} />
              )} />
            <Route path="/boards/:boardId" component={InitialBoardContentContainer} />
          </Switch>
        </section>
        <Route path="/boards/:boardId/card/:cardId" render={props => (
            <ViewCardModalContainer {...props} currentBoard={this.props.currentBoard} />
          )} />
        <ModalControllerContainer {...props}/>
      </div>
    )
  }
}

Boards.propTypes = {
  currentBoard: PropTypes.object
}

export default Boards;
