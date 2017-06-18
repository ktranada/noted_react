import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import NavContainer from './left_column/NavContainer';
import SubNavContainer from './center_column/SubNavContainer';
import SubNavDefault from './center_column/SubNavDefault';
import AccountConfigurationContainer from './center_column/bottom_section/AccountConfigurationContainer';
import ModalControllerContainer from './modal/ModalControllerContainer';

import InitialBoardContentContainer from './right_column/InitialBoardContentContainer';
import NewUserActionsContainer from './right_column/NewUserActionsContainer';

import ListIndexContainer from './right_column/lists/ListIndexContainer';
import ViewCardModalContainer from './modal/view_card/ViewCardModalContainer';
const Landing = () => {
  return (
    <div className="landing-container">
      <section className="left-column">
        <Switch>
          <Route path="/boards/:boardId" component={NavContainer}/>
          <Route component={NavContainer}/>
        </Switch>
      </section>

      <section className="center-column">
        <Switch>
          <Route path="/boards/:boardId" component={SubNavContainer} />
          <Route component={SubNavDefault} />
        </Switch>
        <AccountConfigurationContainer />
      </section>

      <section className="right-column">
        <Switch>
          <Route path="/boards/:boardId/card/:cardId" component={ListIndexContainer} />
          <Route path="/boards/:boardId/lists" component={ListIndexContainer} />
          <Route path="/boards/:boardId" component={InitialBoardContentContainer} />
          <Route component={NewUserActionsContainer} />
        </Switch>
      </section>

      <Route path="/boards/:boardId/card/:cardId" component={ViewCardModalContainer}/>
      <ModalControllerContainer />
    </div>
  )
}

export default Landing;
