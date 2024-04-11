using GenParker.Application.BackgroundServices;
using GenParker.Domain.Repo;
using GenParker.Infrastructure.Repo;
using GenParker.Infrastructure.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GenParker.Application.DI;

public static class AddGenParkerExtension
{
  public static void AddGenParker(this IServiceCollection services, IConfiguration configuration)
  {
    services.AddScoped<ISensorDataRepo, SensorDataRepo>();
    services.AddMediatR(conf => conf.RegisterServicesFromAssembly(typeof(AddGenParkerExtension).Assembly));
    services.AddHostedService<SensorLogsBackgroundService>();
    services.Configure<MongoDbSettings>(s => configuration.GetSection("GenParker:MongoDbSettings").Bind(s));
  }
}
