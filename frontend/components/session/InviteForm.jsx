import React from 'react';
import merge from 'lodash/merge';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputInline from '../form_elements/InputInline';
import Spinner from '../misc/Spinner';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userExists: this.props.userExists,
      invite: null,
      isSubmitting: false,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.getInvite(this.props.code).then(
      invite => this.setState({
        userExists: invite.user_exists,
        invite
      })
    );
  }

  handleChange(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  verifyInputPresence() {
    let usernameError, passwordError;
    if (!this.state['username'].trim()) {
      usernameError = 'Username cannot be blank';
    }

    if (!this.state.userExists && !this.state['password'].trim()) {
      passwordError = 'Password cannot be blank';
    }

    if (usernameError || passwordError) {
      this.setState({
        errors: {
          username: usernameError,
          password: passwordError
        }
      })
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault;
    if (this.isSubmitting || !this.verifyInputPresence()) {
      return;
    }

    const invite = {
      id: this.state.invite.id,
      username: this.state.username,
      password: this.state.password,
      status: 'accepted'
    }

    this.props.updateInvite(invite).then(
      ({ board_id }) => {
        this.props.history.push(`/boards/${board_id}`);
      },
      ({ username, password }) => {
        this.setState({ errors: { username, password } })
      }
    )
  }

  render() {
    const { errors, invite, isSubmitting } = this.state;

    if (!invite) {
      return (
        <div className="session-form loading">
          <div className="session-form__content">
            <img src="https://res.cloudinary.com/mycut/image/upload/v1496273166/logo-min_tmylez.png" />
            <Spinner />
          </div>
        </div>
      )
    }

    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
          <div className="session-form__content">
            <img src="https://res.cloudinary.com/mycut/image/upload/v1496273166/logo-min_tmylez.png" />
            <h3>Join <b>{invite.board_title}</b></h3>
            <InputInline
                type="text"
                hasCustomErrors
                error={errors.username}
                inputClass="session-form__input"
                placeHolder="Username"
                value={this.state.username}
                handleChange={this.handleChange('username')}>
                {errors.username && <p className="error">{errors.username}</p>}
                <p>Username can only contain letters and numbers.</p>
            </InputInline>


            {
              !this.state.userExists &&
              <InputInline
               type="password"
               hasCustomErrors
               error={errors.password}
               inputClass="session-form__input"
               placeHolder="Password"
               value={this.state.password}
               handleChange={this.handleChange('password')}>
               {errors.password && <p className="error">{errors.password}</p>}
               <p>Password must be at least 6 characters long</p>
              </InputInline>
             }

            <button type={isSubmitting ? "button" : "submit"} className="session-form__button">
              {
                isSubmitting ?
                  <Spinner /> :
                  "Continue"
              }
            </button>
          </div>
      </form>
    )
  }
}

export default SessionForm
