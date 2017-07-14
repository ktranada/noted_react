import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  modalType: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  onBackgroundClick: PropTypes.func,
  hideModal: PropTypes.func.isRequired
}

const ESCAPE_KEY_CODE = 27;

class ModalOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEscapeKeyClick = this.handleEscapeKeyClick.bind(this);
  }
  componentWillMount() {
    document.addEventListener('keyup', this.handleEscapeKeyClick, false);

  }

  componentWillUnmount() {

    document.removeEventListener('keyup', this.handleEscapeKeyClick, false);
  }

  handleEscapeKeyClick(e) {
    if (e.which === ESCAPE_KEY_CODE) {
      this.props.hideModal();
    }
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
