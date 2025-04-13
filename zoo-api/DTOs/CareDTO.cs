namespace ZooApi.DTOs
{
    public class CareDTO
    {
        public int? Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Frequencia { get; set; }
        public List<int>? Animais { get; set; }
    }
}
