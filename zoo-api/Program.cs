using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// 🔌 Conexão com banco de dados PostgreSQL
builder.Services.AddDbContext<ZooContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔓 CORS (habilita acesso do frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // Porta padrão do Next.js
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// 📘 Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Zoo API", Version = "v1" });
});

// 🌍 Controllers com tratamento de ciclos de referência
builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

// 🧱 Executa migrations e insere dados iniciais
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ZooContext>();
    db.Database.Migrate();   // Aplica migrations automaticamente
    DbSeeder.Seed(db);       // Seed primário se necessário
}

// 🔧 Middlewares
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Zoo API v1");
    });
}

if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();
app.MapControllers();

// ✅ Endpoint de teste "/weatherforecast"
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild",
    "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        )
    ).ToArray();

    return forecast;
})
.WithName("GetWeatherForecast");

// 🚀 Inicia a aplicação
app.Run();

// 🧊 Tipo auxiliar para o endpoint de teste
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
