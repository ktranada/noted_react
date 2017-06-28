import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge';

const initialState = {
  email: '',
  password: '',
  errors: {
    credentials: null,
    email: null,
    password: null
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
            email: err.email ? err.email[0] : null,
            password: err.password ? err.password[0] : null
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

  renderErrors() {
    return(
      <ul className="session-form__errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const formContent = this.formContent();

    const { errors } = this.state;
    const hasEmailErrors = errors.email;
    const hasPasswordErrors = errors.password;

    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
          <div className="session-form__content">
            <img src="https://res.cloudinary.com/mycut/image/upload/v1496273166/logo-min_tmylez.png" />
            { errors.credentials && <p>{errors.credentials}</p> }
            <h3>{formContent.title}</h3>
            <label
              data-error={hasEmailErrors ? errors.email : ""}
              className={hasEmailErrors ? "error" : ""}>
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleChange('email')}
                placeholder="Email"
                className="session-form__input input-inline"/>

            </label>

            <label
              data-error={hasPasswordErrors ? errors.password: ""}
              className={hasPasswordErrors ? "error" : ""}>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                placeholder="Password"
                className="session-form__input input-inline"/>
            </label>


            <button type="submit" className="session-form__button">{formContent.button}</button>

            <hr />
            <span className="session-form__link">{formContent.bottomText} &nbsp; <a onClick={this.changeForm(formContent.bottomActionTo)}>{formContent.bottomActionText}</a></span>
          </div>
      </form>
    )
  }
}

export default SessionForm
