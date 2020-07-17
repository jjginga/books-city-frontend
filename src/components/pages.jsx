import React, { Component } from 'react';
import _ from 'lodash';

import Books from './books';
import ListGroups from './listGroups';
import Pagination from './common/pagination';

import paginate from '../utils/paginate';
import { getBooks } from '../services/fakeBookService';
import { getCategories } from '../services/fakeCategoryService';

class Pages extends Component {
  state = {
    books: [],
    pageSize: 4,
    currentPage: 1,
    categories: [],
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const categories = [
      { _id: '', name: 'All Categories' },
      ...getCategories(),
    ];

    this.setState({
      books: getBooks(),
      categories,
    });
  }

  handleDelete = (book) => {
    this.setState({
      books: this.state.books.filter((b) => {
        return b !== book;
      }),
    });
  };

  handleLike = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({
      books,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData() {
    const {
      pageSize,
      currentPage,
      books: allBooks,
      sortColumn,
      selectedCategory,
    } = this.state;

    const filtered =
      selectedCategory && selectedCategory._id
        ? allBooks.filter((b) => b.category._id === selectedCategory._id)
        : allBooks;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);
    return { count: filtered.length, data: books };
  }

  render() {
    const {
      pageSize,
      currentPage,
      categories,
      sortColumn,
      selectedCategory,
    } = this.state;

    const { count, data } = this.getPageData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroups
              items={categories}
              selectedItem={selectedCategory}
              onItemSelect={this.handleCategoryChange}
            />
          </div>
          <div className="col-10">
            <Books
              books={data}
              sortColumn={sortColumn}
              count={count}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Pages;
