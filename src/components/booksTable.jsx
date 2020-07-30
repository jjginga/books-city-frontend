import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';
import auth from '../services/authService';

class BooksTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (book) => this.getBookTitle(book),
    },
    {
      path: 'author.lastName',
      label: 'Author',
      content: (book) => book.author.firstName + ' ' + book.author.lastName,
    },
    { path: 'category.name', label: 'Category' },
    { path: 'publisher.name', label: 'Publisher' },
    { path: 'stock', label: 'Stock' },
    { path: 'availableBooks', label: 'Available Books' },
    {
      key: 'like',
      content: (book) => (
        <Like liked={book.liked} onClick={() => this.props.onLike(book)} />
      ),
    },
  ];

  deleteColumn = {
    key: 'delete',
    content: (book) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(book)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();

    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  getBookTitle = (book) => {
    const user = auth.getCurrentUser();

    if (user) return <Link to={`/books/${book._id}`}>{book.title}</Link>;

    return book.title;
  };

  render() {
    const { books, onSort, sortColumn } = this.props;

    return (
      <React.Fragment>
        <Table
          columns={this.columns}
          data={books}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </React.Fragment>
    );
  }
}

export default BooksTable;
