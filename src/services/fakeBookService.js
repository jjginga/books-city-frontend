import * as categoryAPI from './fakeCategoryService';
import * as publisherAPI from './fakePublisherService';
import * as authorAPI from './fakeAuthorService';

const books = [
  {
    _id: '5b21ca3eeb7f6fbccd471815',
    title: 'The Open Society and Its Enemies',
    author: {
      _id: '5b21ca3eeb7f6fbccd471718',
      firstName: 'Karl',
      lastName: 'Popper',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Philosophy' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471918', name: 'Routledge' },
    stock: 6,
    availableBooks: 5,
    publishDate: '2018-01-03T19:04:28.809Z',
  },
  {
    _id: '5b21ca3eeb7f6fbccd471816',
    title: 'Eichmann in Jerusalem',
    author: {
      _id: '5b21ca3eeb7f6fbccd471714',
      firstName: 'Hannah',
      lastName: 'Arendt',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Journalism' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471920', name: 'Penguin Classics' },
    stock: 5,
    availableBooks: 5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471817',
    title: 'The Concept of the Political',
    author: {
      _id: '5b21ca3eeb7f6fbccd471720',
      firstName: 'Carl',
      lastName: 'Schmitt',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Politics' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471918', name: 'Routledge' },
    stock: 10,
    availableBooks: 4,
    liked: true,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471819',
    title: 'All Life is Problem Solving',
    author: {
      _id: '5b21ca3eeb7f6fbccd471718',
      firstName: 'Karl',
      lastName: 'Popper',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Philosophy' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471920', name: 'Penguin Classics' },
    stock: 5,
    availableBooks: 1,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181a',
    title: 'Love and Saint Augustine',
    author: {
      _id: '5b21ca3eeb7f6fbccd471714',
      firstName: 'Hannah',
      lastName: 'Arendt',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Journalism' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471914', name: 'Taylor & Francis' },
    stock: 5,
    availableBooks: 5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181b',
    title: 'Political Theology',
    author: {
      _id: '5b21ca3eeb7f6fbccd471720',
      firstName: 'Carl',
      lastName: 'Schmitt',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Politics' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471914', name: 'Taylor & Francis' },
    stock: 15,
    availableBooks: 15,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181e',
    title: 'The Challenge of Carl Schmitt',
    author: {
      _id: '5b21ca3eeb7f6fbccd471731',
      firstName: 'Chantal',
      lastName: 'Mouffe',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Journalism' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471914', name: 'Taylor & Francis' },
    stock: 9,
    availableBooks: 6,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181f',
    title: 'The Democratic Paradox',
    author: {
      _id: '5b21ca3eeb7f6fbccd471731',
      firstName: 'Chantal',
      lastName: 'Mouffe',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Philosophy' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471918', name: 'Routledge' },
    stock: 6,
    availableBooks: 1,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471821',
    title: 'The Open Universe',
    author: {
      _id: '5b21ca3eeb7f6fbccd471718',
      firstName: 'Karl',
      lastName: 'Popper',
    },
    category: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Philosophy' },
    publisher: { _id: '5b21ca3eeb7f6fbccd471918', name: 'Routledge' },
    stock: 10,
    availableBooks: 10,
  },
];

export function getBooks() {
  return books;
}

export function getBook(id) {
  return books.find((b) => b._id === id);
}

export function saveBook(book) {
  let bookInDb = books.find((b) => b._id === book._id) || {};
  bookInDb.title = book.title;
  bookInDb.author = authorAPI.authors.find((a) => a._id === book.authorId);
  bookInDb.category = categoryAPI.categories.find(
    (c) => c._id === book.categoryId
  );
  bookInDb.publisher = publisherAPI.publishers.find(
    (p) => p._id === book.publisherId
  );
  bookInDb.stock = book.stock;
  bookInDb.availableBooks = book.availableBooks;

  if (!bookInDb._id) {
    bookInDb._id = Date.now().toString();
    books.push(bookInDb);
  }

  return bookInDb;
}

export function deleteBook(id) {
  let bookInDb = books.find((b) => b._id === id);
  books.splice(books.indexOf(bookInDb), 1);
  return bookInDb;
}
