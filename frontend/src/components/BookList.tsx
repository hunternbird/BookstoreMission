import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { fetchBooks } from "../api/BooksAPI";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

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
                  <button
                    className="btn btn-success"
                    data-bs-toggle="tooltip"
                    title="Click to add this book to your cart!"
                    onClick={() => navigate(`/buy/${p.title}/${p.price}`)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {/* <div className="d-flex justify-content-center align-items-center mt-4">
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
        {/* <div className="d-flex justify-content-end mt-3">
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
        </div> */}
      </div>
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
