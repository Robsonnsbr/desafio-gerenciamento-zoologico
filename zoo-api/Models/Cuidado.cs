
using System.ComponentModel.DataAnnotations;

namespace ZooApi.Models
{
    public class Cuidado
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        public string Frequencia { get; set; }

        public ICollection<AnimalCuidado> AnimaisCuidados { get; set; }
    }
}
