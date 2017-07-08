import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import InlineInput from '../form_elements/InlineInput';
import SubmitButton from '../form_elements/SubmitButton';
import FormValidator from '../../util/form_validator';

const initialState = {
  email: '',
  password: '',
  errors: {
    email: '',
    password: ''
  },
  invalidCredentials: false,
  isSubmitting: false
}

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.changeForm = this.changeForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formValidator = new FormValidator(['email', 'password'])
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
      const errors = Object.assign({}, this.state.errors);
      errors[field] = ''
      this.setState({
        [field]: e.currentTarget.value,
        invalidCredentials: false,
        errors
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault;
    if (this.state.isSubmitting) {
      return;
    }

    if (!this.formValidator.verifyInputPresence(this.state)) {
      this.formValidator.notifyComponent(this);
      return;
    }

    this.setState({ isSubmitting: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.processForm(user).then(
      () => {},
      err => {
        this.setState({
          isSubmitting: false,
          errors:  {
            email: err.email ? err.email[0] : '',
            password: err.password ? err.password[0] : ''
          },
          invalidCredentials: err.credentials
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
            { this.state.invalidCredentials && <p className="error__credentials">{this.state.invalidCredentials}</p> }
            <h3>{formContent.title}</h3>
            <InlineInput
                type="email"
                error={errors.email}
                inputClass="session-form__input"
                placeHolder="Email"
                value={this.state.email}
                handleChange={this.handleChange('email')}
              />

            <InlineInput
              type="password"
              error={errors.password}
              inputClass="session-form__input"
              placeHolder="Password"
              value={this.state.password}
              handleChange={this.handleChange('password')}
              />

            <SubmitButton disabled={this.state.isSubmitting} buttonText={formContent.button} buttonClass="session-form__button"/>

            <hr />
            <span className="session-form__link">{formContent.bottomText} &nbsp; <a onClick={this.changeForm(formContent.bottomActionTo)}>{formContent.bottomActionText}</a></span>
          </div>
      </form>
    )
  }
}

export default SessionForm
