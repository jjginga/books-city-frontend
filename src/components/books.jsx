import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';

class Books extends Component {
  columns = [
    { path: 'title', label: 'Title' },
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

  renderMessage(count) {
    if (count === 0) return 'There are no available books';

    return `There are ${count} available.`;
  }

  render() {
    const { books, count, onSort, sortColumn } = this.props;

    return (
      <React.Fragment>
        <span>{this.renderMessage(count)}</span>
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

export default Books;
