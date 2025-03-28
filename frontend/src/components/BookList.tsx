import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategory=${encodeURIComponent(cat)}`)
        .join("&");
      
      const response = await fetch(
        `https://localhost:5000/Bookstore/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${
          selectedCategories.length ? `&${categoryParams}` : ""
        }`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  return (
    <>
    
      <div className="container mt-4">
      {/* Limited Time Offer Alert */}
      <div className="alert alert-warning" role="alert">
        Limited Time Offer! 20% off on selected books.
      </div>
        <h1 className="text-center">Books for Sale</h1>

        {/* Books Grid */}
        <div className="row">
          {books.map((p) => (
            <div className="col-md-4 mb-4" key={p.bookID}>
              <div className="card h-100 shadow-sm hover">
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Author:</strong> {p.author}
                    </li>
                    <li>
                      <strong>Publisher:</strong> {p.publisher}
                    </li>
                    <li>
                      <strong>ISBN:</strong> {p.isbn}
                    </li>
                    <li>
                      <strong>Classification:</strong> {p.classification}
                    </li>
                    <li>
                      <strong>Category:</strong> {p.category}
                    </li>
                    <li>
                      <strong>Page Count:</strong> {p.pageCount}
                    </li>
                    <li>
                      <strong>Price:</strong> ${p.price}
                    </li>
                  </ul>
                  <button className="btn btn-success" data-bs-toggle="tooltip"
  title="Click to add this book to your cart!" onClick={() => navigate(`/buy/${p.title}/${p.price}`)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-outline-primary me-2"
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn me-1 ${
                pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setPageNum(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-primary ms-2"
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

