import React from 'react';

class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  handleBackgroundClick(e) {
    if (e.target === e.currentTarget) {
      this.props.hideModal();
    }
  }

  render() {
    return (
      <div
        className="modal-wrapper"
        onClick={this.handleBackgroundClick}>
        { this.props.children }
      </div>
    )
  }
}

export default ModalWrapper;
