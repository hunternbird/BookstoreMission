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
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, string sortBy = "title", string sortOrder = "asc")
        {
            if (pageNum < 1) pageNum = 1; // Ensure valid page number

            var query = _bookContext.Books.AsQueryable();

            // Apply sorting
            switch (sortBy.ToLower())
            {
                case "title":
                    query = (sortOrder.ToLower() == "desc") ? query.OrderByDescending(b => b.Title) : query.OrderBy(b => b.Title);
                    break;
                default:
                    query = query.OrderBy(b => b.Title); // Default sorting
                    break;
            }

            var books = query
                .Skip(Math.Max(0, (pageNum - 1) * pageHowMany))
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new
            {
                books = books ?? new List<Book>(), 
                totalNumBooks = totalNumBooks
            });
        }
    }
}
