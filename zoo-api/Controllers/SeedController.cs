using Microsoft.AspNetCore.Mvc;
using ZooApi.Data;

namespace ZooApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly ZooContext _context;

        public SeedController(ZooContext context)
        {
            _context = context;
        }

        [HttpGet("testar")]
        public IActionResult SeedManual()
        {
            try
            {
                DbSeeder.Seed(_context);
                return Ok("Seed executado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao executar seed: {ex.Message}");
            }
        }
    }
}
