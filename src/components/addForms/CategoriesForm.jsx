import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';

import { saveCategory } from '../../services/categoryService';

class CategoriesForm extends Form {
  state = {
    data: {
      name: '',
    },

    errors: {},
  };

  schema = {
    name: Joi.string().min(3).required().label('First Name'),
  };

  doSubmit = async () => {
    await saveCategory(this.state.data);
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <h1>Category</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default CategoriesForm;
