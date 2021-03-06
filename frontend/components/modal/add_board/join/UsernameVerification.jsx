import React from 'react';
import PropTypes from 'prop-types';
import JoinBoardStep from './JoinBoardStep';
import InviteVerificationErrors from './InviteVerificationErrors';
import Footer from './Footer';

class UsernameVerification extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: '',
      error: '',
      isSubmitting: false
    }
  }

  handleChange(e) {
    this.setState({
      username: e.currentTarget.value,
      error: ''
    });
  }

  handleClick() {
    if (this.state.error) return;
    if (!this.state.username.trim()) {
      this.setState({ error: 'Username cannot be blank'})
      return;
    }

    if (!this.state.username.match(/^[a-z0-9]{1,16}$/)) {
      this.setState({error: 'Username format is incorrect'});
      return;
    }
    const invite = {
      id: this.props.invite.id,
      username: this.state.username
    }
    this.props.updateInvite(invite).then(
      invite => {
        this.props.requestBoard(invite.board_id).then(
          (board) => this.props.history.push(`/boards/${board.id}`)
        )
      },
      error => {
        let visibleError =
        this.setState({
          error: error['status'] || error['username'] || '',
          isSubmitting: false
        })
      }
    )
    this.setState({isSubmitting: true});
  }

  render() {
    return (
      <div>
        <div className="board-form-join__inputs">
          <JoinBoardStep
            label="USERNAME"
            value={this.state.username}
            handleChange={this.handleChange}>
            <InviteVerificationErrors error={this.state.error}/>
            <p>Username can only contain lowercase letters, numbers, and cannot exceed 16 characters.</p>
          </JoinBoardStep>
        </div>
        <Footer
          buttonType="submit"
          buttonText="Join"
          disabled={this.state.isSubmitting}
          handleButtonClick={this.handleClick}
          handleBackClick={this.props.handleBackClick} />
      </div>
    )
  }
}

UsernameVerification.propTypes = {
  history: PropTypes.object.isRequired,
  invite: PropTypes.object.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  updateModalState: PropTypes.func.isRequired
}

export default UsernameVerification;
