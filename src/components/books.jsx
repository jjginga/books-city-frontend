import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';

import BooksTable from './booksTable';
import ListGroups from './listGroups';
import Pagination from './common/pagination';

import paginate from '../utils/paginate';
import { getBooks, deleteBook } from '../services/bookService';
import { getCategories } from '../services/categoryService';
import SearchBox from './common/searchBox';

class Books extends Component {
  state = {
    books: [],
    pageSize: 4,
    currentPage: 1,
    categories: [],
    searchQuery: '',
    selectedCategory: null,
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data } = await getCategories();

    const categories = [{ _id: '', name: 'All Categories' }, ...data];

    const { data: books } = await getBooks();

    this.setState({
      books,
      categories,
    });
  }

  handleDelete = async (book) => {
    const originalBooks = this.state.books;

    const books = originalBooks.filter((b) => {
      return b._id !== book._id;
    });

    this.setState({ books });

    try {
      await deleteBook(book._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('This book has already been deleted.');

      this.setState({ books: originalBooks });
    }
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
    this.setState({
      selectedCategory: category,
      searchQuery: '',
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedCategory: null,
      currentPage: 1,
    });
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
      searchQuery,
    } = this.state;

    let filtered = allBooks;

    if (searchQuery)
      filtered = allBooks.filter((b) =>
        b.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory._id)
      allBooks.filter((b) => b.category._id === selectedCategory._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const books = paginate(sorted, currentPage, pageSize);
    return { count: filtered.length, data: books };
  }

  renderMessage = (count) => {
    if (count === 0) return 'There are no available books';

    return `There are ${count} available.`;
  };

  render() {
    const {
      pageSize,
      currentPage,
      categories,
      sortColumn,
      selectedCategory,
      searchQuery,
    } = this.state;

    const { count, data } = this.getPageData();
    const { user } = this.props;

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
          <div className="col">
            {user && (
              <Link
                to="/books/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Book
              </Link>
            )}

            <p>{this.renderMessage(count)}</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <BooksTable
              books={data}
              sortColumn={sortColumn}
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

export default Books;
