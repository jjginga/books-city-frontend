import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';

class BooksTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (book) => <Link to={`/books/${book._id}`}>{book.title}</Link>,
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
    {
      key: 'delete',
      content: (book) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(book)}
        >
          Delete
        </button>
      ),
    },
  ];

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
