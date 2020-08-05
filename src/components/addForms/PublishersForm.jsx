import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';

import { savePublisher } from '../../services/publisherService';

class PublishersForm extends Form {
  state = {
    data: {
      name: '',
    },

    errors: {},
  };

  schema = {
    name: Joi.string().min(5).required().label('First Name'),
  };

  doSubmit = async () => {
    await savePublisher(this.state.data);
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <h1>Publisher</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('name', 'Name')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default PublishersForm;
