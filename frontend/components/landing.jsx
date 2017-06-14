import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import BoardTogglerContainer from './board_toggler/board_toggler_container';
import BoardNavContainer from './board_nav/board_nav_container';
import BoardNavDefault from './board_nav/board_nav_default';
import AccountConfigurationContainer from './account/account_configuration_container';

import ModalControllerContainer from './modal/modal_controller_container';

const Landing = () => (
  <div className="landing-container">
    <section className="left-column">
      <Switch>
        <Route path="/boards/:boardId" component={BoardTogglerContainer}/>
        <Route component={BoardTogglerContainer}/>
      </Switch>
    </section>

    <section className="center-column">
      <Switch>
        <Route path="/boards/:boardId" component={BoardNavContainer} />
        <Route component={BoardNavDefault} />
      </Switch>
      <AccountConfigurationContainer />
    </section>

    <section className="board-content">
    </section>

    <ModalControllerContainer />
  </div>
)

// <ModalContainer />

export default Landing;
// <BoardContentContainer />
