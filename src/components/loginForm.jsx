import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;

      await auth.login(username, password);

      const { state } = this.props.location;
      //full reload of the application
      window.location = state ? state.from.pathname : '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    // const { data } = this.state;
    // const { errors } = this.state;

    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
