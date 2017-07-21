import React from 'react';
import PropTypes from 'prop-types';
import JoinBoardStep from './JoinBoardStep';
import Footer from './Footer';
import InviteVerificationErrors from './InviteVerificationErrors';

const propTypes = {
  email: PropTypes.string.isRequired,
  requestInvite: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  updateModalState: PropTypes.func.isRequired
}

class InviteVerification extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      code: '',
      error: '',
    }
  }

  handleChange(e) {
    this.setState({
      code: e.currentTarget.value,
      error: ''
    });
  }

  handleClick() {
    if (this.state.error) return;
    if (!this.state.code.trim()) {
      this.setState({ error: 'Code cannot be blank'})
      return;
    }

    this.props.requestInvite(this.state.code).then(
      invite => {
        if (invite.email !== this.props.email) {
          this.setState({ error: 'revoked' });
          return;
        }
        this.props.updateModalState('invite', invite);
      },
      error => this.setState({ error: error['status'] })
    )
  }

  render() {
    return (
      <div>
        <div className="board-form-join__inputs">
          <JoinBoardStep
            label="Invite Code"
            value={this.state.code}
            handleChange={this.handleChange}>
            <InviteVerificationErrors error={this.state.error} />
          </JoinBoardStep>
        </div>
        <Footer
          buttonText="Continue"
          handleBackClick={this.props.handleBackClick}
          handleButtonClick={this.handleClick} />
      </div>
    )
  }
}

InviteVerification.propTypes = propTypes;

export default InviteVerification;
