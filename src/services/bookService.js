import http from './httpService';

const url = '/books';

function bookUrl(id) {
  return `${url}/${id}`;
}

export function getBooks() {
  return http.get(url);
}

export function getBook(id) {
  return http.get(bookUrl(id));
}

export async function saveBook(book) {
  if (book._id) {
    const updatedBook = { ...book };
    delete updatedBook._id;
    return http.put(bookUrl(book._id), updatedBook);
  }

  return http.post(url, book);
}

export function deleteBook(id) {
  return http.delete(bookUrl(id));
}
