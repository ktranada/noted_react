import React from 'react';
import { Link } from 'react-router-dom';
import merge from 'lodash/merge'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: this.props.errors
    }
    this.changeForm = this.changeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      let nextRoute = `/boards${nextProps.currentBoardId ? `/${nextProps.currentBoard.id}` : ''}`;
      this.props.history.push(nextRoute);
    }
  }

  changeForm(to) {
    return () => {
      this.setState({
        email: '',
        password: '',
        errors: []
      })
      this.props.clearErrors();
      this.props.history.push(to);
    }
  }

  handleUpdate(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault;
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      this.setState({
        errors: 'Email is not valid'
      });
      return;
    }
    const user = merge({}, this.state);
    this.props.processForm(user);
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
    return (
      <form className="session-form" onSubmit={this.handleSubmit}>
          <div className="session-form__content">
            <img src="https://res.cloudinary.com/mycut/image/upload/v1496273166/logo-min_tmylez.png" />
            <h3>{formContent.title}</h3>
              {this.renderErrors()}
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleUpdate('email')}
              placeholder="Email"
              className="session-form__input"/>

            <input
              type="password"
              value={this.state.password}
              onChange={this.handleUpdate('password')}
              placeholder="Password"
              className="session-form__input"/>


            <button type="submit" className="session-form__button">{formContent.button}</button>

            <hr />
            <span className="session-form__link">{formContent.bottomText} &nbsp; <a onClick={this.changeForm(formContent.bottomActionTo)}>{formContent.bottomActionText}</a></span>
          </div>
      </form>
    )
  }
}

export default SessionForm
