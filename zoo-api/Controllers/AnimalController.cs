using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using ZooApi.DTOs;
using ZooApi.Models;

namespace ZooApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimalController : ControllerBase
    {
        private readonly ZooContext _context;

        public AnimalController(ZooContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AnimalDTO>>> GetAnimais()
        {
            var animais = await _context.Animais
                .Include(a => a.AnimaisCuidados)
                .ThenInclude(ac => ac.Cuidado)
                .ToListAsync();

            var result = animais.Select(a => new AnimalDTO
            {
                Id = a.Id,
                Nome = a.Nome,
                Descricao = a.Descricao,
                DataNascimento = a.DataNascimento,
                Especie = a.Especie,
                Habitat = a.Habitat,
                Pais_Origem = a.PaisOrigem,
                Cuidados = a.AnimaisCuidados.Select(ac => ac.CuidadoId).ToList()
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AnimalDTO>> GetAnimal(int id)
        {
            var animal = await _context.Animais
                .Include(a => a.AnimaisCuidados)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (animal == null)
                return NotFound();

            var dto = new AnimalDTO
            {
                Id = animal.Id,
                Nome = animal.Nome,
                Descricao = animal.Descricao,
                DataNascimento = animal.DataNascimento,
                Especie = animal.Especie,
                Habitat = animal.Habitat,
                Pais_Origem = animal.PaisOrigem,
                Cuidados = animal.AnimaisCuidados.Select(ac => ac.CuidadoId).ToList()
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<AnimalDTO>> PostAnimal(AnimalDTO dto)
        {
            var novo = new Animal
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                DataNascimento = DateTime.SpecifyKind(dto.DataNascimento, DateTimeKind.Utc),
                Especie = dto.Especie,
                Habitat = dto.Habitat,
                PaisOrigem = dto.Pais_Origem,
                AnimaisCuidados = dto.Cuidados.Select(id => new AnimalCuidado
                {
                    CuidadoId = id,
                    DataAplicacao = DateTime.UtcNow
                }).ToList()
            };

            _context.Animais.Add(novo);
            await _context.SaveChangesAsync();

            var dtoRetorno = new AnimalDTO
            {
                Id = novo.Id,
                Nome = novo.Nome,
                Descricao = novo.Descricao,
                DataNascimento = novo.DataNascimento,
                Especie = novo.Especie,
                Habitat = novo.Habitat,
                Pais_Origem = novo.PaisOrigem,
                Cuidados = novo.AnimaisCuidados.Select(ac => ac.CuidadoId).ToList()
            };

            return CreatedAtAction(nameof(GetAnimal), new { id = novo.Id }, dtoRetorno);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnimal(int id, AnimalDTO dto)
        {
            var animal = await _context.Animais
                .Include(a => a.AnimaisCuidados)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (animal == null)
                return NotFound();

            animal.Nome = dto.Nome;
            animal.Descricao = dto.Descricao;
            animal.DataNascimento = DateTime.SpecifyKind(dto.DataNascimento, DateTimeKind.Utc);
            animal.Especie = dto.Especie;
            animal.Habitat = dto.Habitat;
            animal.PaisOrigem = dto.Pais_Origem;

            _context.AnimaisCuidados.RemoveRange(animal.AnimaisCuidados);

            animal.AnimaisCuidados = dto.Cuidados.Select(cuidadoId => new AnimalCuidado
            {
                AnimalId = id,
                CuidadoId = cuidadoId,
                DataAplicacao = DateTime.UtcNow
            }).ToList();

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnimal(int id)
        {
            var animal = await _context.Animais.FindAsync(id);
            if (animal == null)
                return NotFound();

            _context.Animais.Remove(animal);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
