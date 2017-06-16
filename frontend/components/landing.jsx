import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import BoardTogglerContainer from './left_column/BoardTogglerContainer';
import BoardNavContainer from './center_column/BoardNavContainer';
import BoardNavDefault from './center_column/BoardNavDefault';
import AccountConfigurationContainer from './center_column/bottom_section/AccountConfigurationContainer';
import ModalControllerContainer from './modal/ModalControllerContainer';

import BoardContentNavContainer from './right_column/BoardContentNavContainer';
import BoardContentDefaultContainer from './right_column/BoardContentDefaultContainer';

const Landing = () => {
  return (
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

      <section className="right-column">
        <Switch>
          <Route path="/boards/:boardId" component={BoardContentNavContainer} />
          <Route component={BoardContentDefaultContainer} />
        </Switch>
      </section>

      <ModalControllerContainer />
    </div>
  )
}
// <Switch>
//   <Route
//     path="/boards/:boardId/messages/:channelId"
//     component={BoardMessagesContainer} />
export default Landing;
// <BoardContentDefaultContainer />
