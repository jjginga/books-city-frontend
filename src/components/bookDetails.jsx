import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getCategories } from '../services/categoryService';
import { getAuthors } from '../services/authorService';
import { getPublishers } from '../services/publisherService';
import { getBook, saveBook } from '../services/bookService';

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

  async populateAuthors() {
    const { data: authors } = await getAuthors();
    this.setState({ authors });
  }

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async populatePublishers() {
    const { data: publishers } = await getPublishers();
    this.setState({ publishers });
  }

  async populateBook() {
    try {
      const bookId = this.props.match.params.id;
      if (bookId === 'new') return;

      const { data: book } = await getBook(bookId);
      this.setState({ data: this.mapToViewModel(book) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateAuthors();
    await this.populateCategories();
    await this.populatePublishers();

    await this.populateBook();
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

  doSubmit = async () => {
    await saveBook(this.state.data);
    this.props.history.push('/books');
  };

  authorName = (author) => {
    return author.firstName + ' ' + author.lastName;
  };

  render() {
    //const { match } = this.props;
    const { authors, categories, publishers } = this.state;

    return (
      <div>
        <h1>Book</h1>

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
