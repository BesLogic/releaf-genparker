using GenParker.Application.DI;
using Microsoft.AspNetCore.Authentication;
using Microsoft.OpenApi.Models;
using Releaf.Application.DI;
using Releaf.Auth.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddKeyPerFile(directoryPath: "/run/secrets", optional: true);

// Add services to the container.
builder.Services.AddGenParker(builder.Configuration);
builder.Services.AddReleafAuth();
builder.Services.AddReleafApp(builder.Configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo { Title = "Releaf.Api", Version = "v1" });
  c.AddSecurityDefinition("basic", new OpenApiSecurityScheme
  {
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    Scheme = "basic",
    In = ParameterLocation.Header,
    Description = "Basic authentication header"
  });
  c.AddSecurityRequirement(new OpenApiSecurityRequirement
  {
    {
      new OpenApiSecurityScheme
      {
        Reference = new OpenApiReference
        {
          Type = ReferenceType.SecurityScheme,
          Id = "basic"
        }
      },
      new string[] { }
    }
  });
});

builder.Services.AddAuthentication("BasicAuthentication").AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
