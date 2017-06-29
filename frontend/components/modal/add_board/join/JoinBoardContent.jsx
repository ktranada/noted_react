import React from 'react';
import InviteVerification from './InviteVerification';
import UsernameVerification from './UsernameVerification';
import PropTypes from 'prop-types';
class JoinBoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      invite: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateModalState = this.updateModalState.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault;
  }

  updateModalState(field, value) {
    this.setState({ [field]: value })
  }

  render() {
    return (
      <form className="board-form-join" onSubmit={this.handleSubmit}>
        <header>Join a Board</header>
        <p>By joining a board, you will gain access to its content and will be able to collaborate with its members.</p>
        {
          !this.state.invite &&
          <InviteVerification
            currentUser={this.props.currentUser}
            handleBackClick={this.props.handleBackClick}
            getInvite={this.props.getInvite}
            updateModalState={this.updateModalState}/>
        }
        {
          this.state.invite &&
          <UsernameVerification
            history={this.props.history}
            invite={this.state.invite}
            updateInvite={this.props.updateInvite}
            handleBackClick={this.props.handleBackClick}
            updateModalState={this.updateModalState}/>
        }
      </form>
    )
  }
}
JoinBoardContent.propTypes = {
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  getInvite: PropTypes.func.isRequired,
  updateInvite: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired
}


export default JoinBoardContent;
