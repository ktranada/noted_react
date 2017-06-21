import React from 'react';
import PropTypes from 'prop-types';

class ModalOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      if (this.props.onBackgroundClick) {
        this.props.onBackgroundClick();
        return;
      }
      this.props.hideModal();
    }
  }

  render() {
    return (
      <div
        className="modal-overlay"
        onClick={this.handleBackgroundClick}>
        <div className={`${this.props.modalType}-modal__wrapper`}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

ModalOverlay.propTypes = {
  modalType: PropTypes.string.isRequired,
  handleBackgroundClick: PropTypes.func
}

export default ModalOverlay;
