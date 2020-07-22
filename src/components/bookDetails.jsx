import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getCategories } from '../services/fakeCategoryService';
import { getAuthors } from '../services/fakeAuthorService';
import { getPublishers } from '../services/fakePublisherService';
import { getBook, saveBook } from '../services/fakeBookService';

class BookDetails extends Form {
  state = {
    data: {
      title: '',
      authorId: '',
      categoryId: '',
      publisherId: '',
      stock: '',
    },

    authors: [],
    categories: [],
    publishers: [],

    errors: {},
  };

  componentDidMount() {
    const authors = getAuthors();
    const categories = getCategories();
    const publishers = getPublishers();

    this.setState({ authors, categories, publishers });

    const bookId = this.props.match.params.id;

    if (bookId === 'new') return;

    const book = getBook(bookId);

    if (!book) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(book) });
  }

  mapToViewModel = (book) => {
    return {
      _id: book._id,
      title: book.title,
      authorId: book.author._id,
      categoryId: book.category._id,
      publisherId: book.publisher._id,
      stock: book.stock,
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    authorId: Joi.string().required().label('Author'),
    categoryId: Joi.string().required().label('Category'),
    publisherId: Joi.string().required().label('Publisher'),
    stock: Joi.number().min(1).max(100).required().label('Stock'),
  };

  doSubmit = () => {
    saveBook(this.state.data);
    this.props.history.push('/books');
  };

  authorName = (author) => {
    return author.firstName + ' ' + author.lastName;
  };

  render() {
    const { match } = this.props;
    const { authors, categories, publishers } = this.state;

    return (
      <div>
        <h1>Book - {match.params.id} </h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('authorId', 'Author', authors, this.authorName)}
          {this.renderSelect('categoryId', 'Category', categories)}
          {this.renderSelect('publisherId', 'Publisher', publishers)}
          {this.renderInput('stock', 'stock')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default BookDetails;
