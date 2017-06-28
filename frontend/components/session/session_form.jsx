import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import InputInline from '../form_elements/InputInline';

const initialState = {
  email: '',
  password: '',
  errors: {
    credentials: '',
    email: '',
    password: ''
  }
}

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.changeForm = this.changeForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyInputPresence = this.verifyInputPresence.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      let nextRoute = `/boards${nextProps.currentBoardId ? `/${nextProps.currentBoard.id}` : ''}`;
      this.props.history.push(nextRoute);
    }
  }

  changeForm(to) {
    return () => {
      this.setState(initialState);
      this.props.history.push(to);
    }
  }

  handleChange(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  verifyInputPresence() {
    let emailError, passwordError;
    if (!this.state['email'].trim()) {
      emailError = 'Email cannot be blank';
    }

    if (!this.state['password'].trim()) {
      passwordError = 'Password cannot be blank';
    }

    if (emailError || passwordError) {
      this.setState({
        errors: {
          email: emailError,
          password: passwordError
        }
      })
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault;
    if (!this.verifyInputPresence()) {
      return;
    }

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.processForm(user).then(
      () => {},
      err => {
        this.setState({
          errors:  {
            credentials: err.credentials,
            email: err.email ? err.email[0] : '',
            password: err.password ? err.password[0] : ''
          }
        })
      }
    )
  }

  formContent() {
    const isLogin = this.props.formType === 'login';
    return ({
      title: isLogin ? 'Log in' : 'Sign up',
      button: 'Continue',
      bottomText: isLogin ? 'Don\'t have an account?' : 'Already have an account?',
      bottomActionText: isLogin ? 'Sign up' : 'Log in',
      bottomActionTo: isLogin ? '/signup' : '/login'
    });
  }

  render() {
    const formContent = this.formContent();
    const { errors } = this.state;

    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
          <div className="session-form__content">
            <img src="https://res.cloudinary.com/mycut/image/upload/v1496273166/logo-min_tmylez.png" />
            { errors.credentials && <p>{errors.credentials}</p> }
            <h3>{formContent.title}</h3>
            <InputInline
                type="email"
                error={errors.email}
                inputClass="session-form__input"
                placeHolder="Email"
                value={this.state.email}
                handleChange={this.handleChange('email')}
              />

            <InputInline
              type="password"
              error={errors.password}
              inputClass="session-form__input"
              placeHolder="Password"
              value={this.state.password}
              handleChange={this.handleChange('password')}
              />

            <button type="submit" className="session-form__button">{formContent.button}</button>

            <hr />
            <span className="session-form__link">{formContent.bottomText} &nbsp; <a onClick={this.changeForm(formContent.bottomActionTo)}>{formContent.bottomActionText}</a></span>
          </div>
      </form>
    )
  }
}

export default SessionForm
