import React from 'react';

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
        { this.props.children }
      </div>
    )
  }
}

export default ModalOverlay;
