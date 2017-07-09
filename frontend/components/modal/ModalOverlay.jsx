import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  modalType: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  onBackgroundClick: PropTypes.func,
  hideModal: PropTypes.func.isRequired
}

class ModalOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target === e.currentTarget || (e.target.classList[0] && e.target.classList[0].endsWith('wrapper'))) {
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
        onClick={this.handleClick}>
        <div className={`${this.props.modalType}-modal__wrapper`}>
          <i
            onClick={this.handleClick}
            className="modal-exit material-icons">&#xE14C;</i>
          { this.props.children }
        </div>
      </div>
    )
  }
}

ModalOverlay.propTypes = propTypes;

export default ModalOverlay;
