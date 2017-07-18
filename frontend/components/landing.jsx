import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import AccountSettings from './sub_nav/bottom_section/AccountSettings';
import NavContainer from './nav/NavContainer';
import SubNavDefault from './sub_nav/SubNavDefault';
import ModalControllerContainer from './modal/ModalControllerContainer';
import NewUserActions from './board_content/NewUserActions';

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
            timezone={this.props.currentUser.timezone}
            currentUserId={this.props.currentUser.id}
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
