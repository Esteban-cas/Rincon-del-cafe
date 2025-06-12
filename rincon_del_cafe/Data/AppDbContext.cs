using Microsoft.EntityFrameworkCore;
using rincon_del_cafe.models;

namespace rincon_del_cafe.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Book> Libros { get; set; } = null!;
    }
}
