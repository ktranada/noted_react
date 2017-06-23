import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router-dom';
import NavContainer from './left_column/NavContainer';
import SubNavDefault from './center_column/SubNavDefault';
import ModalControllerContainer from './modal/ModalControllerContainer';
import NewUserActions from './right_column/NewUserActions';

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
        <section className="left-column">
          <NavContainer
            {...this.props}
            isLanding={true}
            toggleModal={this.toggleModal} />
        </section>
        <section className="center-column">
          <SubNavDefault isLoading={false}  />
        </section>
        <section className="right-column">
          <NewUserActions
            toggleModal={this.toggleModal}
            boardCount={this.props.boardCount} />
        </section>
        <ModalControllerContainer />
      </div>
    )
  }
}

Landing.propTypes = {
  toggleModal: PropTypes.func.isRequired
}

export default Landing;
