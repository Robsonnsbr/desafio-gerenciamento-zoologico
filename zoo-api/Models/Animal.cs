
using System.ComponentModel.DataAnnotations;

namespace ZooApi.Models
{
    public class Animal
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        public DateTime DataNascimento { get; set; }

        [Required]
        public string Especie { get; set; }

        public string Habitat { get; set; }

        public string PaisOrigem { get; set; }

        public ICollection<AnimalCuidado> AnimaisCuidados { get; set; }
    }
}
