using GenParker.Application.DI;
using Releaf.Application.DI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGenParker(builder.Configuration);
builder.Services.AddReleafAuth();
builder.Services.AddReleafApp();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
