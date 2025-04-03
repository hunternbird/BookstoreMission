using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _bookContext;
        
        public BookstoreController(BookstoreDbContext temp)
        {
            _bookContext = temp;
        }
        // [HttpGet("AllBooks")]
        // public IActionResult GetBooks(int pageHowMany= 10, int pageNum = 1)
        // {
        //     var something = _bookContext.Books
        //         .Skip((pageNum - 1)*pageHowMany)
        //         .Take(pageHowMany)
        //         .ToList();
        //     
        //     var totalNumBooks = _bookContext.Books.Count();
        //     return Ok(new
        //     {
        //         books = something,
        //         totalNumBooks = totalNumBooks
        //     });
        // }
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, [FromQuery] List<string>? bookCategory = null)
        {
            var query = _bookContext.Books.AsQueryable();
            if (bookCategory != null && bookCategory.Any())
            {
                query = query.Where(p => bookCategory.Contains(p.Category));
                
            }
            
            var totalNumBooks = query.Count();
            var something = query
                .Skip((pageNum - 1)*pageHowMany)
                .Take(pageHowMany)
                .ToList();
            
            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }
        
        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookCategories = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategories);
        }
        
        [HttpPost("AddBook")]
        public IActionResult AddProject([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }
        
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }
        
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteProject(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}
