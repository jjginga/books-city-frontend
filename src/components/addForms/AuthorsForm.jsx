import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';

import { saveAuthor } from '../../services/authorService';

class AuthorsForm extends Form {
  state = {
    data: {
      firstName: '',
      middleName: '',
      lastName: '',
    },

    errors: {},
  };

  schema = {
    firstName: Joi.string().min(2).required().label('First Name'),
    middleName: Joi.string().label('Middle Name'),
    lastName: Joi.string().min(2).required().label('Last Name'),
  };

  doSubmit = async () => {
    await saveAuthor(this.state.data);
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <h1>Author</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('firstName', 'First Name')}
          {this.renderInput('middleName', 'Middle Name')}
          {this.renderInput('lastName', 'Last Name')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default AuthorsForm;
