using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using rincon_del_cafe.Data;
using rincon_del_cafe.models;


namespace rincon_del_cafe.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly AppDbContext _db;
        public BookController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<Book>> GetAll()
        {
            return await _db.Libros.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Book>> GetCustomer(int id)
        {
            return await _db.Libros.FindAsync(id) is Book c ? Ok(c) : NotFound();
            
        }

        [HttpPost]
        public async Task<ActionResult<Book>> PostCustomer(Book libro)
        {
            _db.Libros.Add(libro);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = libro.Id });
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, Book libro)
        {
            if (id != libro.Id)
            {
                return BadRequest("Customer ID mismatch");
            }

            _db.Entry(libro).State = EntityState.Modified;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var libro = await _db.Libros.FindAsync(id);
            if (libro == null)
            {
                return NotFound();
            }
            _db.Libros.Remove(libro);
            await _db.SaveChangesAsync();
            return NoContent();
        }

    }
}
