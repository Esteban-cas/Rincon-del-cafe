using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace rincon_del_cafe.models
{
    [Table("libros")]
    public class Book
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("isbn")]
        public string? Isbn { get; set; }

        [Column("titulo")]
        public string Titulo { get; set; }

        [Column("autor")]
        public string Autor { get; set; }

        [Column("editorial")]
        public string Editorial { get; set; }

        [Column("imagen_portada")]
        public string ImagenPortada { get; set; }

        [Column("publishing_year")]
        public int PublishingYear { get; set; }

        [Column("paginas")]
        public int Paginas { get; set; }

        [Column("genero")]
        public string Genero{ get; set; }

        [Column("descripcion")]
        public string Descripcion { get; set; }
    }
}
