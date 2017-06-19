import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavContainer from './left_column/NavContainer';
import SubNavDefault from './center_column/SubNavDefault';
import ModalControllerContainer from './modal/ModalControllerContainer';
import NewUserActionsContainer from './right_column/NewUserActionsContainer';

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="left-column">
        <Route isLanding={true} component={NavContainer}/>
      </section>
      <section className="center-column">
        <Route component={SubNavDefault} />
      </section>
      <section className="right-column">
        <Route component={NewUserActionsContainer} />
      </section>
      <ModalControllerContainer />
    </div>
  )
}

export default Landing;
