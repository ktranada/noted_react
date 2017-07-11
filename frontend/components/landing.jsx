import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import AccountSettings from './center_column/bottom_section/AccountSettings';
import NavContainer from './left_column/NavContainer';
import SubNavDefault from './center_column/SubNavDefault';
import ModalControllerContainer from './modal/ModalControllerContainer';
import NewUserActions from './right_column/NewUserActions';

const propTypes = {
  toggleModal: PropTypes.func.isRequired
}

class Landing extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(type) {
    return () => {
      this.props.toggleModal(type);
    }
  }
  render() {
    return (
      <div className="landing-container">
        <section className="nav">
          <NavContainer
            {...this.props}
            isLanding={true}
            toggleModal={this.toggleModal} />
        </section>
        <section className="sub-nav">
          <SubNavDefault isLoading={false}  />
          <AccountSettings
            currentUser={this.props.currentUser}
            toggleModal={this.toggleModal}/>
        </section>
        <section className="board-content">
          <NewUserActions
            toggleModal={this.toggleModal}
            boardCount={this.props.boardCount} />
        </section>
        <ModalControllerContainer {...this.props}/>
      </div>
    )
  }
}

Landing.propTypes = propTypes;
export default Landing;
