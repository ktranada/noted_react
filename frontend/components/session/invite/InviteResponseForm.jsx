import React from 'react';
import merge from 'lodash/merge';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InlineInput from '../../form_elements/InlineInput';
import InviteStatus from './InviteStatus';
import Spinner from '../../util/Spinner';
import FormValidator from '../../../util/form_validator';

class InviteResponseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userExists: this.props.userExists,
      invite: null,
      isSubmitting: false,
      status: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateErrors = this.handleUpdateErrors.bind(this);
    this.formValidator = new FormValidator(['username', this.props.userExists ? '' : 'password']);
  }

  componentWillMount() {
    this.props.getInvite(this.props.code).then(
      invite => {
        if (this.props.isLoggedIn && this.props.currentUser.email !== invite.email) {
          // Logout unless current user is recipient of invite
          this.props.logoutCurrentUser();
        }

        const newFields = ['username', invite.user_exists ? '' : 'password'];
        this.formValidator.updateFields(newFields);

        this.setState({
          userExists: invite.user_exists,
          invite
        })
      },
      err => {
        if (err['status']) {
          this.handleUpdateErrors(err['status']);
        }
      }
    );
  }

  handleChange(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value,
        errors: {
          [field]: ''
        }
      });
    }
  }

  handleUpdateErrors(status) {
    if (status === 'responded' || status === 'revoked') {
      this.setState({ status });
    }
  }

  handleSubmit(e) {
    e.preventDefault;
    if (this.isSubmitting) {
      return;
    }

    if (!this.formValidator.verifyInputPresence(this.state)) {
      this.formValidator.notifyComponent(this);
      return;
    }

    this.setState({ isSubmitting: true });

    const invite = {
      id: this.state.invite.id,
      username: this.state.username,
      password: this.state.password
    }

    this.props.updateInvite(invite).then(
      () => {
        // 1) If the currently logged in user is the recipient,
        //    they will be sent to the new board
        // 2) This user will be sent to the login page --
        //    all routes (except session) require auth
        this.props.history.push(`/boards/${this.state.invite.board_id}`);
      },
      error => {
        if (error['status']) {
          this.handleUpdateErrors(error['status']);
          return;
        }

        const { username, password } = error;
        this.setState({
          isSubmitting: false,
          errors: { username, password }
        })
      }
    )
  }

  render() {
    const { errors, invite, isSubmitting, status } = this.state;
    if (!invite || status) {
      return (
        <div className="session-form invite-form loading">
          <div className="session-form__content">
            <img src="https://res.cloudinary.com/mycut/image/upload/v1496273166/logo-min_tmylez.png" />
            {status ? <InviteStatus status={status}/> : <Spinner />}
          </div>
        </div>
      )
    }

    const logoLink = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3000/#/login' : 'http://noted.pw/#/login';
    return (
      <form className="session-form invite-form" onSubmit={this.handleSubmit}>
        <div className="session-form__content">
          <a href={logoLink}>
            <img src="https://res.cloudinary.com/mycut/image/upload/v1496273166/logo-min_tmylez.png" />
          </a>
          <h3>Join <b>{invite.board_title}</b></h3>
          <InlineInput
            type="text"
            hasCustomErrors
            error={errors.username}
            inputClass="session-form__input"
            placeHolder="Username"
            value={this.state.username}
            handleChange={this.handleChange('username')}>
            {errors.username && <p className="error">{errors.username}</p>}
            <p>Username can only contain lowercase letters and numbers.</p>
          </InlineInput>


          {
              !this.state.userExists &&
            <InlineInput
              type="password"
              hasCustomErrors
              error={errors.password}
              inputClass="session-form__input"
              placeHolder="Password"
              value={this.state.password}
              handleChange={this.handleChange('password')}>
              {errors.password && <p className="error">{errors.password}</p>}
              <p>Password must be at least 6 characters long.</p>
            </InlineInput>
          }

          <button type={isSubmitting ? "button" : "submit"} className={`session-form__button ${isSubmitting ? 'processing' : ''}`}>
            {isSubmitting ? <Spinner /> : "Continue"}
            </button>
          </div>
      </form>
    )
  }
}

InviteResponseForm.propTypes = {
  code: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}



export default InviteResponseForm;
