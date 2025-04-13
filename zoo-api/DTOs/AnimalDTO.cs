namespace ZooApi.DTOs
{
    public class AnimalDTO
    {
        public int? Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Especie { get; set; }
        public string Habitat { get; set; }
        public string Pais_Origem { get; set; }
        public List<int>? Cuidados { get; set; }
    }
}
