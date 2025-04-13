using ZooApi.Models;

namespace ZooApi.Data
{
    public static class DbSeeder
    {
        public static void Seed(ZooContext context)
        {
            // Evita duplicação
            if (context.Cuidados.Any() || context.Animais.Any()) return;

            // 🔹 Cuidados
            var cuidados = new List<Cuidado>
            {
                new Cuidado { Nome = "Vacinação", Descricao = "Vacina anual contra doenças", Frequencia = "Anual" },
                new Cuidado { Nome = "Exame", Descricao = "Exame clínico completo", Frequencia = "Mensal" },
                new Cuidado { Nome = "Alimentação", Descricao = "Alimentação balanceada", Frequencia = "Diária" },
                new Cuidado { Nome = "Higiene", Descricao = "Banho e limpeza", Frequencia = "Semanal" },
                new Cuidado { Nome = "Treinamento", Descricao = "Treinamento comportamental", Frequencia = "Semanal" }
            };

            context.Cuidados.AddRange(cuidados);
            context.SaveChanges();

            // 🔹 Animais
            var animais = new List<Animal>
            {
                new Animal
                {
                    Nome = "Leão",
                    Descricao = "Leão africano",
                    DataNascimento = new DateTime(2016, 4, 20),
                    Especie = "Panthera leo",
                    Habitat = "Savanas",
                    PaisOrigem = "Quênia"
                },
                new Animal
                {
                    Nome = "Girafa",
                    Descricao = "Girafa-masai",
                    DataNascimento = new DateTime(2018, 3, 14),
                    Especie = "Giraffa camelopardalis",
                    Habitat = "Campos abertos",
                    PaisOrigem = "Tanzânia"
                },
                new Animal
                {
                    Nome = "Elefante",
                    Descricao = "Elefante asiático",
                    DataNascimento = new DateTime(2010, 7, 30),
                    Especie = "Elephas maximus",
                    Habitat = "Florestas tropicais",
                    PaisOrigem = "Índia"
                },
                new Animal
                {
                    Nome = "Tigre",
                    Descricao = "Tigre-de-bengala",
                    DataNascimento = new DateTime(2015, 1, 12),
                    Especie = "Panthera tigris tigris",
                    Habitat = "Florestas",
                    PaisOrigem = "Índia"
                },
                new Animal
                {
                    Nome = "Pinguim",
                    Descricao = "Pinguim de Magalhães",
                    DataNascimento = new DateTime(2020, 11, 25),
                    Especie = "Spheniscus magellanicus",
                    Habitat = "Costas e ilhas geladas",
                    PaisOrigem = "Argentina"
                }
            };

            context.Animais.AddRange(animais);
            context.SaveChanges();

            // 🔗 Relacionamento muitos-para-muitos
            var relacionamentos = new List<AnimalCuidado>
            {
                new AnimalCuidado { AnimalId = animais[0].Id, CuidadoId = cuidados[0].Id },
                new AnimalCuidado { AnimalId = animais[0].Id, CuidadoId = cuidados[2].Id },

                new AnimalCuidado { AnimalId = animais[1].Id, CuidadoId = cuidados[2].Id },
                new AnimalCuidado { AnimalId = animais[1].Id, CuidadoId = cuidados[1].Id },

                new AnimalCuidado { AnimalId = animais[2].Id, CuidadoId = cuidados[0].Id },
                new AnimalCuidado { AnimalId = animais[2].Id, CuidadoId = cuidados[3].Id },

                new AnimalCuidado { AnimalId = animais[3].Id, CuidadoId = cuidados[4].Id },
                new AnimalCuidado { AnimalId = animais[3].Id, CuidadoId = cuidados[2].Id },

                new AnimalCuidado { AnimalId = animais[4].Id, CuidadoId = cuidados[1].Id },
                new AnimalCuidado { AnimalId = animais[4].Id, CuidadoId = cuidados[3].Id }
            };

            context.AnimaisCuidados.AddRange(relacionamentos);
            context.SaveChanges();
        }
    }
}
