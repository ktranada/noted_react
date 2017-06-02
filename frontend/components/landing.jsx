import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import BoardIndexContainer from './board/index/board_index_container';
import BoardActionsContainer from './board/actions/board_actions_container';
import BoardActionsInitialState from './board/actions/board_actions_initial_state';
import AccountConfigurationContainer from './account/account_configuration_container.jsx';
// import BoardContentContainer from './board/board_content_container';

const Landing = () => (
  <div className="landing-container">
    <Switch>
      <Route path="/boards/:boardId" component={BoardIndexContainer}/>
      <Route path="/boards" component={BoardIndexContainer}/>
    </Switch>

    <section className="board-nav">
      <Switch>
        <Route path="/boards/:boardId" component={BoardActionsContainer} />
        <Route path="/boards" component={BoardActionsInitialState} />
      </Switch>
      < />
      <AccountConfigurationContainer />
    </section>
  </div>
)

// <ModalContainer />

export default Landing;
// <BoardContentContainer />
