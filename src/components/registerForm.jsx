import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label('Username'),
    password: Joi.string().min(6).required().label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
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

    return (
      <div>
        <h1>Register Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
