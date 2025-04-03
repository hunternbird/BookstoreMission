import { useState } from 'react';
import { addBook } from '../api/BooksAPI';
import { Book } from '../types/Book';

interface NewBookProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBook = ({ onSuccess, onCancel }: NewBookProps) => {
  const [bookData, setBookData] = useState<Book>({
    bookID: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(bookData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <label>
        Book title:
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Publisher:
        <input
          type="text"
          name="publisher"
          value={bookData.publisher}
          onChange={handleChange}
        />
      </label>
      <label>
        ISBN:
        <input
          type="number"
          name="isbn"
          value={bookData.isbn}
          onChange={handleChange}
        />
      </label>
      <label>
        Classification:
        <input
          type="text"
          name="classification"
          value={bookData.classification}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={bookData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Page Count:
        <input
          type="number"
          name="pageCount"
          value={bookData.pageCount}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={bookData.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewBook;