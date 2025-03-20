import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {

  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("asc"); // Sort order state

//   useEffect(() => {
//     const fetchBooks = async () => {
//         const response = await fetch(`https://localhost:5000/Bookstore/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}`);
//         const data = await response.json();
//         setBooks(data.books);
//         setTotalItems(data.totalNumBooks);
//         setTotalPages(Math.ceil(totalItems / pageSize));
//     };
//     fetchBooks();
//   }, [pageSize, pageNum, totalItems]);
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                `https://localhost:5000/Bookstore/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        };
        fetchBooks();
    }, [pageSize, pageNum, sortOrder]);

  return (
    <>
    {/* Navbar */}
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">Online Bookstore</a>
      </div>
    </nav>

    <div className="container mt-4">
      <h1 className="text-center">Books for Sale</h1>

      {/* Sorting Dropdown */}
      <div className="d-flex justify-content-end mb-3">
        <label className="me-2 fw-bold">Sort by Title:</label>
        <select
          className="form-select w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending (A-Z)</option>
          <option value="desc">Descending (Z-A)</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="row">
        {books.map((p) => (
          <div className="col-md-4 mb-4" key={p.bookID}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <ul className="list-unstyled">
                  <li><strong>Author:</strong> {p.author}</li>
                  <li><strong>Publisher:</strong> {p.publisher}</li>
                  <li><strong>ISBN:</strong> {p.isbn}</li>
                  <li><strong>Classification:</strong> {p.classification}</li>
                  <li><strong>Category:</strong> {p.category}</li>
                  <li><strong>Page Count:</strong> {p.pageCount}</li>
                  <li><strong>Price:</strong> ${p.price}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button className="btn btn-outline-primary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn me-1 ${pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setPageNum(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button className="btn btn-outline-primary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="d-flex justify-content-end mt-3">
        <label className="me-2 fw-bold">Results per page:</label>
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  </>
  );
}

export default BookList;