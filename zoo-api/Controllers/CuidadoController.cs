// Controllers/CuidadoController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using ZooApi.DTOs;
using ZooApi.Models;

namespace ZooApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuidadoController : ControllerBase
    {
        private readonly ZooContext _context;

        public CuidadoController(ZooContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CareDTO>>> GetCuidados()
        {
            var cuidados = await _context.Cuidados
                .Include(c => c.AnimaisCuidados)
                .ThenInclude(ac => ac.Animal)
                .ToListAsync();

            var result = cuidados.Select(c => new CareDTO
            {
                Id = c.Id,
                Nome = c.Nome,
                Descricao = c.Descricao,
                Frequencia = c.Frequencia,
                Animais = c.AnimaisCuidados.Select(ac => ac.AnimalId).ToList()
            });

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CareDTO>> GetCuidado(int id)
        {
            var cuidado = await _context.Cuidados
                .Include(c => c.AnimaisCuidados)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cuidado == null)
                return NotFound();

            var dto = new CareDTO
            {
                Id = cuidado.Id,
                Nome = cuidado.Nome,
                Descricao = cuidado.Descricao,
                Frequencia = cuidado.Frequencia,
                Animais = cuidado.AnimaisCuidados.Select(ac => ac.AnimalId).ToList()
            };

            return Ok(dto);
        }

        [HttpPost]
        public async Task<ActionResult<CareDTO>> PostCuidado(CareDTO dto)
        {
            var novo = new Cuidado
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Frequencia = dto.Frequencia,
                AnimaisCuidados = dto.Animais.Select(id => new AnimalCuidado
                {
                    AnimalId = id,
                    DataAplicacao = DateTime.UtcNow
                }).ToList()
            };

            _context.Cuidados.Add(novo);
            await _context.SaveChangesAsync();

            var dtoRetorno = new CareDTO
            {
                Id = novo.Id,
                Nome = novo.Nome,
                Descricao = novo.Descricao,
                Frequencia = novo.Frequencia,
                Animais = novo.AnimaisCuidados.Select(ac => ac.AnimalId).ToList()
            };

            return CreatedAtAction(nameof(GetCuidado), new { id = novo.Id }, dtoRetorno);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCuidado(int id, CareDTO dto)
        {
            var cuidado = await _context.Cuidados
                .Include(c => c.AnimaisCuidados)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cuidado == null)
                return NotFound();

            cuidado.Nome = dto.Nome;
            cuidado.Descricao = dto.Descricao;
            cuidado.Frequencia = dto.Frequencia;

            _context.AnimaisCuidados.RemoveRange(cuidado.AnimaisCuidados);

            cuidado.AnimaisCuidados = dto.Animais.Select(animalId => new AnimalCuidado
            {
                CuidadoId = id,
                AnimalId = animalId,
                DataAplicacao = DateTime.UtcNow
            }).ToList();

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuidado(int id)
        {
            var cuidado = await _context.Cuidados.FindAsync(id);
            if (cuidado == null)
                return NotFound();

            _context.Cuidados.Remove(cuidado);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}